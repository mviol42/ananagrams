import unittest
import os
import json
import tempfile
from datetime import datetime, timedelta
from unittest.mock import patch, MagicMock

# Import the module under test
import puzzle_generator


class TestWeightedRandomLetters(unittest.TestCase):
    """Tests for the weighted_random_letters function."""

    def test_returns_correct_number_of_letters(self):
        """Should return exactly n letters."""
        letters = puzzle_generator.weighted_random_letters(16)
        self.assertEqual(len(letters), 16)

    def test_returns_custom_number_of_letters(self):
        """Should return the specified number of letters."""
        for n in [5, 10, 20, 25]:
            letters = puzzle_generator.weighted_random_letters(n)
            self.assertEqual(len(letters), n)

    def test_returns_only_lowercase_letters(self):
        """All returned letters should be lowercase a-z."""
        letters = puzzle_generator.weighted_random_letters(100)
        for letter in letters:
            self.assertIn(letter, 'abcdefghijklmnopqrstuvwxyz')

    def test_letter_frequencies_sum_to_one(self):
        """Letter frequencies should approximately sum to 1."""
        total = sum(puzzle_generator.LETTER_FREQUENCIES.values())
        self.assertAlmostEqual(total, 1.0, places=2)


class TestPuzzleStorage(unittest.TestCase):
    """Tests for puzzle save/load functionality."""

    def setUp(self):
        """Create a temporary file for testing."""
        self.temp_dir = tempfile.mkdtemp()
        self.temp_file = os.path.join(self.temp_dir, 'test-puzzles.json')
        self.original_puzzle_file = puzzle_generator.PUZZLE_FILE
        puzzle_generator.PUZZLE_FILE = self.temp_file

    def tearDown(self):
        """Clean up temporary files."""
        puzzle_generator.PUZZLE_FILE = self.original_puzzle_file
        if os.path.exists(self.temp_file):
            os.remove(self.temp_file)
        os.rmdir(self.temp_dir)

    def test_save_and_load_puzzles(self):
        """Should correctly save and load puzzles."""
        test_puzzles = {
            "1/1/2025": {"Letters": ["a", "b", "c"], "Words": ["abc"]},
            "1/2/2025": {"Letters": ["d", "e", "f"], "Words": ["def"]}
        }
        puzzle_generator.save_puzzles(test_puzzles)
        loaded = puzzle_generator.load_puzzles()
        self.assertEqual(loaded, test_puzzles)

    def test_load_puzzles_empty_file(self):
        """Should return empty dict when file doesn't exist."""
        loaded = puzzle_generator.load_puzzles()
        self.assertEqual(loaded, {})

    def test_append_puzzle_for_date(self):
        """Should append a puzzle for a specific date."""
        target_date = datetime(2025, 6, 15)
        letters = ["t", "e", "s", "t"]
        words = ["test"]

        puzzle_generator.append_puzzle_for_date(letters, words, target_date)

        loaded = puzzle_generator.load_puzzles()
        self.assertIn("6/15/2025", loaded)
        self.assertEqual(loaded["6/15/2025"]["Letters"], letters)
        self.assertEqual(loaded["6/15/2025"]["Words"], words)

    def test_append_multiple_puzzles(self):
        """Should correctly append multiple puzzles for different dates."""
        dates = [
            datetime(2025, 7, 1),
            datetime(2025, 7, 2),
            datetime(2025, 7, 3),
        ]

        for i, date in enumerate(dates):
            puzzle_generator.append_puzzle_for_date(
                letters=[chr(ord('a') + i)],
                solution=[f"word{i}"],
                target_date=date
            )

        loaded = puzzle_generator.load_puzzles()
        self.assertEqual(len(loaded), 3)
        self.assertIn("7/1/2025", loaded)
        self.assertIn("7/2/2025", loaded)
        self.assertIn("7/3/2025", loaded)


class TestGeneratePuzzleForDate(unittest.TestCase):
    """Tests for the generate_puzzle_for_date function."""

    def setUp(self):
        """Create a temporary file for testing."""
        self.temp_dir = tempfile.mkdtemp()
        self.temp_file = os.path.join(self.temp_dir, 'test-puzzles.json')
        self.original_puzzle_file = puzzle_generator.PUZZLE_FILE
        puzzle_generator.PUZZLE_FILE = self.temp_file

    def tearDown(self):
        """Clean up temporary files."""
        puzzle_generator.PUZZLE_FILE = self.original_puzzle_file
        if os.path.exists(self.temp_file):
            os.remove(self.temp_file)
        os.rmdir(self.temp_dir)

    def test_generates_puzzle_for_date(self):
        """Should generate and save a puzzle for the specified date."""
        target_date = datetime(2025, 8, 20)
        puzzle_generator.generate_puzzle_for_date(target_date)

        loaded = puzzle_generator.load_puzzles()
        self.assertIn("8/20/2025", loaded)
        self.assertIn("Letters", loaded["8/20/2025"])
        self.assertIn("Words", loaded["8/20/2025"])

    def test_generated_puzzle_has_16_letters(self):
        """Generated puzzle should have 16 letters."""
        target_date = datetime(2025, 9, 1)
        puzzle_generator.generate_puzzle_for_date(target_date)

        loaded = puzzle_generator.load_puzzles()
        self.assertEqual(len(loaded["9/1/2025"]["Letters"]), 16)

    def test_generated_puzzle_has_solution(self):
        """Generated puzzle should have at least one word in solution."""
        target_date = datetime(2025, 9, 2)
        puzzle_generator.generate_puzzle_for_date(target_date)

        loaded = puzzle_generator.load_puzzles()
        self.assertGreater(len(loaded["9/2/2025"]["Words"]), 0)


class TestWeeklyGeneration(unittest.TestCase):
    """Tests for generating a week's worth of puzzles."""

    def setUp(self):
        """Create a temporary file for testing."""
        self.temp_dir = tempfile.mkdtemp()
        self.temp_file = os.path.join(self.temp_dir, 'test-puzzles.json')
        self.original_puzzle_file = puzzle_generator.PUZZLE_FILE
        puzzle_generator.PUZZLE_FILE = self.temp_file

    def tearDown(self):
        """Clean up temporary files."""
        puzzle_generator.PUZZLE_FILE = self.original_puzzle_file
        if os.path.exists(self.temp_file):
            os.remove(self.temp_file)
        os.rmdir(self.temp_dir)

    def test_generates_seven_days_of_puzzles(self):
        """Should generate puzzles for 7 consecutive days."""
        base_date = datetime(2025, 10, 1)

        with patch.object(puzzle_generator, 'datetime') as mock_datetime:
            mock_datetime.now.return_value = base_date
            mock_datetime.side_effect = lambda *args, **kwargs: datetime(*args, **kwargs)

            # Generate 7 days of puzzles
            for day_offset in range(1, 8):
                target_date = base_date + timedelta(days=day_offset)
                puzzle_generator.generate_puzzle_for_date(target_date)

        loaded = puzzle_generator.load_puzzles()
        self.assertEqual(len(loaded), 7)

        # Verify each day has a puzzle
        expected_dates = ["10/2/2025", "10/3/2025", "10/4/2025", "10/5/2025",
                         "10/6/2025", "10/7/2025", "10/8/2025"]
        for date_str in expected_dates:
            self.assertIn(date_str, loaded)

    def test_each_puzzle_is_unique(self):
        """Each generated puzzle should have different letters."""
        base_date = datetime(2025, 11, 1)

        for day_offset in range(1, 8):
            target_date = base_date + timedelta(days=day_offset)
            puzzle_generator.generate_puzzle_for_date(target_date)

        loaded = puzzle_generator.load_puzzles()
        letter_sets = [tuple(p["Letters"]) for p in loaded.values()]

        # While theoretically possible to have duplicates, it's astronomically unlikely
        # This test verifies puzzles are being generated independently
        self.assertEqual(len(letter_sets), len(set(letter_sets)))


if __name__ == '__main__':
    unittest.main()
