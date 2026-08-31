import json
import sys
import unittest
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT / "scripts"))

from generate_prompt_cheatsheet import build_page_groups, load_library, prepare_image  # noqa: E402


class PromptCheatSheetTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = load_library(PROJECT_ROOT / "src" / "lib" / "data" / "image-prompts.json")
        cls.groups = build_page_groups(cls.data)

    def test_export_contains_exactly_six_pages(self):
        self.assertEqual(len(self.groups), 6)

    def test_export_covers_every_tested_prompt_once(self):
        tested = [prompt for prompt in self.data["prompts"] if prompt["status"] == "tested"]
        exported = [prompt for group in self.groups for prompt in group["prompts"]]

        self.assertEqual(len(tested), 87)
        self.assertEqual(len(exported), len(tested))
        self.assertEqual(
            sorted(prompt["command"] for prompt in exported),
            sorted(prompt["command"] for prompt in tested),
        )
        self.assertEqual(len({prompt["command"] for prompt in exported}), 87)

    def test_export_never_contains_research_ideas(self):
        exported = [prompt for group in self.groups for prompt in group["prompts"]]

        self.assertTrue(exported)
        self.assertTrue(all(prompt["status"] == "tested" for prompt in exported))
        self.assertFalse(any(prompt["status"] == "idea" for prompt in exported))

    def test_no_page_exceeds_eighteen_cards(self):
        self.assertTrue(all(1 <= len(group["prompts"]) <= 18 for group in self.groups))

    def test_every_page_has_a_unique_title_and_valid_image_paths(self):
        titles = [group["title"] for group in self.groups]
        self.assertEqual(len(set(titles)), 6)
        for group in self.groups:
            for prompt in group["prompts"]:
                image_path = PROJECT_ROOT / "static" / prompt["image"].lstrip("/")
                self.assertTrue(image_path.exists(), f"Missing {image_path}")

    def test_pdf_images_are_downsampled_before_embedding(self):
        source = PROJECT_ROOT / "static" / "images" / "blog" / "ki-bildprompts" / "01-turnaround.webp"
        prepared = prepare_image(source)

        self.assertLess(len(prepared.getvalue()), source.stat().st_size)
        prepared.seek(0)
        from PIL import Image

        with Image.open(prepared) as image:
            self.assertLessEqual(image.width, 900)
            self.assertLessEqual(image.height, 700)


if __name__ == "__main__":
    unittest.main()
