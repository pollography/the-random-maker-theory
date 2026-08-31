import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
SKILL_PATH = REPO_ROOT / ".claude/skills/trmt-content-engine/SKILL.md"


class TrmtSkillContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.text = SKILL_PATH.read_text(encoding="utf-8")

    def test_routes_editorial_work_to_the_canonical_pollo_blog_skill(self):
        self.assertIn(r"C:\Users\Pollo\.codex\skills\pollo-blog\SKILL.md", self.text)
        self.assertIn("notebooklm-evidence-pipeline.md", self.text)

    def test_has_no_fail_open_or_invented_experience_rules(self):
        forbidden = (
            "Weiter ohne Research",
            "Fuellwoerter sind Pflicht",
            "Mindestens 1 \"ich hab das getestet\"-Moment",
            "Source-Wait Timeout | Weiter",
            "Research Timeout | Weiter",
        )
        for phrase in forbidden:
            with self.subTest(phrase=phrase):
                self.assertNotIn(phrase, self.text)

    def test_draft_work_is_decoupled_from_publish_side_effects(self):
        self.assertIn("draft: true", self.text)
        self.assertIn("kein Git", self.text)
        self.assertIn("kein Deployment", self.text)
        self.assertIn("keine Veroeffentlichung", self.text)


if __name__ == "__main__":
    unittest.main()
