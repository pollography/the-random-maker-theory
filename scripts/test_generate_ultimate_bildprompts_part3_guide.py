import hashlib
import re
import sys
import unittest
from pathlib import Path

from pypdf import PdfReader


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT / "scripts"))

from generate_ultimate_bildprompts_part3_guide import (  # noqa: E402
    PUBLIC_OUTPUT,
    QA_OUTPUT,
    build_page_groups,
    fit_prompt_lines,
    generate_pdf,
    load_library,
)


class UltimateBildpromptsPart3GuideTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = load_library(PROJECT_ROOT / "src" / "lib" / "data" / "image-prompts.json")
        cls.groups = build_page_groups(cls.data)
        generate_pdf()

    def test_export_contains_eighteen_readable_two_prompt_pages(self):
        self.assertEqual(len(self.groups), 18)
        self.assertTrue(all(len(group["prompts"]) == 2 for group in self.groups))

        for prompt in [prompt for group in self.groups for prompt in group["prompts"]]:
            font_size, _, _ = fit_prompt_lines(prompt["promptText"], 333, 225)
            self.assertGreaterEqual(font_size, 10.5, prompt["id"])

    def test_export_covers_the_36_part3_prompts_once(self):
        prompts = [prompt for group in self.groups for prompt in group["prompts"]]

        self.assertEqual(len(prompts), 36)
        self.assertEqual(len({prompt["command"] for prompt in prompts}), 36)
        self.assertTrue(all(prompt.get("series") == "ultimate-bildprompts-part-3" for prompt in prompts))
        self.assertTrue(all(prompt.get("promptType") == "detailed" for prompt in prompts))
        self.assertTrue(all(len(prompt.get("promptText", "")) > 80 for prompt in prompts))

    def test_export_preserves_the_verified_32_to_4_verdict_split(self):
        prompts = [prompt for group in self.groups for prompt in group["prompts"]]
        verdicts = [prompt["verdict"] for prompt in prompts]

        self.assertEqual(verdicts.count("PASS"), 32)
        self.assertEqual(verdicts.count("TEILWEISE"), 4)
        self.assertEqual(verdicts.count("FAIL"), 0)

    def test_public_and_qa_outputs_are_identical_eighteen_page_pdfs(self):
        self.assertTrue(PUBLIC_OUTPUT.exists())
        self.assertTrue(QA_OUTPUT.exists())
        self.assertEqual(PUBLIC_OUTPUT.read_bytes(), QA_OUTPUT.read_bytes())
        self.assertEqual(
            hashlib.sha256(PUBLIC_OUTPUT.read_bytes()).hexdigest(),
            hashlib.sha256(QA_OUTPUT.read_bytes()).hexdigest(),
        )
        self.assertEqual(len(PdfReader(str(PUBLIC_OUTPUT)).pages), 18)

    def test_pdf_contains_every_template_once_and_explains_placeholders(self):
        text = re.sub(
            r"\s+",
            " ",
            "\n".join(page.extract_text() or "" for page in PdfReader(str(PUBLIC_OUTPUT)).pages),
        )
        self.assertIn("[[PLACEHOLDERS]]", text)
        self.assertIn("before sending", text)
        for prompt in [prompt for group in self.groups for prompt in group["prompts"]]:
            normalized_prompt = re.sub(r"\s+", " ", prompt["promptText"])
            self.assertEqual(text.count(normalized_prompt), 1, prompt["id"])


if __name__ == "__main__":
    unittest.main()
