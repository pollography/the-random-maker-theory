import sys
import unittest
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT / "scripts"))

from generate_ultimate_bildprompts_part3_guide import build_page_groups, load_library  # noqa: E402


class UltimateBildpromptsPart3GuideTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = load_library(PROJECT_ROOT / "src" / "lib" / "data" / "image-prompts.json")
        cls.groups = build_page_groups(cls.data)

    def test_export_contains_twelve_content_pages(self):
        self.assertEqual(len(self.groups), 12)
        self.assertTrue(all(len(group["prompts"]) == 3 for group in self.groups))

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


if __name__ == "__main__":
    unittest.main()
