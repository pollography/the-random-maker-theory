import sys
import unittest
from pathlib import Path

from PIL import Image


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = Path(
    r"C:\Users\Pollo\Documents\ChatGPT\TRMT\artifacts\bildprompts-neu-2026-08-31"
)
sys.path.insert(0, str(PROJECT_ROOT / "scripts"))

from prepare_precise_prompt_assets import (  # noqa: E402
    BOARD_ASSETS,
    HERO_FILENAME,
    RESULT_ASSETS,
    THUMB_FILENAME,
    prepare_assets,
)


class PrecisePromptAssetTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        prepare_assets(SOURCE_ROOT, PROJECT_ROOT)
        cls.blog_root = PROJECT_ROOT / "static" / "images" / "blog"
        cls.result_root = cls.blog_root / "praezise-bildprompts"
        cls.thumb_root = cls.blog_root / "ki-bildprompts" / "thumbs"

    def test_manifest_contains_exactly_twenty_four_results_and_four_boards(self):
        self.assertEqual(len(RESULT_ASSETS), 24)
        self.assertEqual(len(BOARD_ASSETS), 4)
        self.assertEqual(len({asset.output_name for asset in RESULT_ASSETS}), 24)

    def test_every_result_is_a_square_webp(self):
        for asset in RESULT_ASSETS:
            path = self.result_root / asset.output_name
            self.assertTrue(path.exists(), f"Missing {path}")
            with Image.open(path) as image:
                self.assertEqual(image.format, "WEBP")
                self.assertEqual(image.size, (512, 512))

    def test_every_result_has_a_compact_library_thumbnail(self):
        for asset in RESULT_ASSETS:
            path = self.thumb_root / asset.output_name
            self.assertTrue(path.exists(), f"Missing {path}")
            with Image.open(path) as image:
                self.assertEqual(image.format, "WEBP")
                self.assertEqual(image.size, (480, 480))

    def test_every_board_is_a_1200_by_800_webp(self):
        for asset in BOARD_ASSETS:
            path = self.result_root / asset.output_name
            self.assertTrue(path.exists(), f"Missing {path}")
            with Image.open(path) as image:
                self.assertEqual(image.format, "WEBP")
                self.assertEqual(image.size, (1200, 800))

    def test_hero_and_thumbnail_use_required_blog_dimensions(self):
        expectations = {
            HERO_FILENAME: (1200, 675),
            THUMB_FILENAME: (400, 225),
        }
        for filename, expected_size in expectations.items():
            path = self.blog_root / filename
            self.assertTrue(path.exists(), f"Missing {path}")
            with Image.open(path) as image:
                self.assertEqual(image.format, "WEBP")
                self.assertEqual(image.size, expected_size)


if __name__ == "__main__":
    unittest.main()
