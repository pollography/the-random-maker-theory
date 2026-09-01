import hashlib
import re
import sys
import unittest
from pathlib import Path

from pypdf import PdfReader


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT / "scripts"))

import generate_precise_prompt_guide as guide  # noqa: E402

from generate_precise_prompt_guide import (  # noqa: E402
    PUBLIC_OUTPUT,
    QA_OUTPUT,
    build_family_groups,
    fit_prompt_lines,
    generate_pdf,
    load_library,
)


class PrecisePromptGuideTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = load_library()
        cls.groups = build_family_groups(cls.data)
        cls.precise_prompts = [
            prompt
            for prompt in cls.data["prompts"]
            if prompt.get("promptType") == "detailed"
            and prompt.get("articleSlug") == "praezise-bildprompts-weniger-zufall"
        ]
        generate_pdf()

    def test_export_contains_four_families_with_six_briefs_each(self):
        self.assertEqual(len(self.groups), 4)
        self.assertEqual([len(group["prompts"]) for group in self.groups], [6, 6, 6, 6])

    def test_export_builds_twelve_two_prompt_content_pages(self):
        build_content_pages = getattr(guide, "build_content_pages", lambda groups: groups)
        pages = build_content_pages(self.groups)

        self.assertEqual(len(pages), 12)
        self.assertTrue(all(len(page["prompts"]) == 2 for page in pages))
        self.assertEqual(
            [prompt["id"] for page in pages for prompt in page["prompts"]],
            [prompt["id"] for group in self.groups for prompt in group["prompts"]],
        )

    def test_every_prompt_fits_at_readable_font_size(self):
        for prompt in self.precise_prompts:
            font_size, _, _ = fit_prompt_lines(prompt["promptText"], 333, 225)
            self.assertGreaterEqual(font_size, 10.5, prompt["id"])

    def test_export_covers_all_twenty_four_briefs_exactly_once(self):
        precise_prompts = [
            prompt
            for prompt in self.data["prompts"]
            if prompt.get("promptType") == "detailed"
            and prompt.get("articleSlug") == "praezise-bildprompts-weniger-zufall"
        ]
        exported = [prompt for group in self.groups for prompt in group["prompts"]]

        self.assertEqual(len(precise_prompts), 24)
        self.assertEqual(len(exported), 24)
        self.assertEqual(
            sorted(prompt["id"] for prompt in precise_prompts),
            sorted(prompt["id"] for prompt in exported),
        )
        self.assertEqual(len({prompt["promptText"] for prompt in exported}), 24)

    def test_export_excludes_mini_prompts_and_private_ideas(self):
        exported = [prompt for group in self.groups for prompt in group["prompts"]]
        self.assertTrue(all(prompt["status"] == "tested" for prompt in exported))
        self.assertTrue(all(prompt["promptType"] == "detailed" for prompt in exported))
        self.assertTrue(all(prompt["command"].startswith("/") for prompt in exported))

    def test_every_exported_image_exists(self):
        for group in self.groups:
            for prompt in group["prompts"]:
                path = PROJECT_ROOT / "static" / prompt["image"].lstrip("/")
                self.assertTrue(path.exists(), f"Missing {path}")

    def test_public_and_qa_outputs_are_byte_identical_thirteen_page_pdfs(self):
        self.assertTrue(PUBLIC_OUTPUT.exists())
        self.assertTrue(QA_OUTPUT.exists())
        self.assertEqual(PUBLIC_OUTPUT.read_bytes(), QA_OUTPUT.read_bytes())
        self.assertEqual(hashlib.sha256(PUBLIC_OUTPUT.read_bytes()).hexdigest(), hashlib.sha256(QA_OUTPUT.read_bytes()).hexdigest())
        self.assertEqual(len(PdfReader(str(PUBLIC_OUTPUT)).pages), 13)

    def test_pdf_text_contains_every_full_prompt_once(self):
        text = re.sub(r"\s+", " ", "\n".join(page.extract_text() or "" for page in PdfReader(str(PUBLIC_OUTPUT)).pages))
        self.assertIn("[[DOPPELTE KLAMMERN]]", text)
        self.assertIn("vor dem Absenden", text)
        for group in self.groups:
            for prompt in group["prompts"]:
                normalized_prompt = re.sub(r"\s+", " ", prompt["promptText"])
                self.assertEqual(text.count(normalized_prompt), 1, prompt["id"])


if __name__ == "__main__":
    unittest.main()
