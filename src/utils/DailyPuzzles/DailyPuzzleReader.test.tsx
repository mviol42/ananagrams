import { getLetters } from './DailyPuzzleReader';

describe('DailyPuzzleReader', () => {
  describe('getLetters', () => {
    test('returns letters for a valid date', () => {
      const letters = getLetters('12/29/2025');
      expect(letters).toBeDefined();
      expect(Array.isArray(letters)).toBe(true);
      expect(letters.length).toBeGreaterThan(0);
    });

    test('returns uppercase letters', () => {
      const letters = getLetters('12/29/2025');
      letters.forEach(letter => {
        expect(letter).toBe(letter.toUpperCase());
      });
    });

    test('returns letters sorted alphabetically', () => {
      const letters = getLetters('12/29/2025');
      const sortedLetters = [...letters].sort((a, b) => a.localeCompare(b));
      expect(letters).toEqual(sortedLetters);
    });

    test('returns empty array for non-existent date', () => {
      const letters = getLetters('1/1/2000');
      expect(letters).toEqual([]);
    });

    test('returns empty array for invalid date format', () => {
      const letters = getLetters('invalid-date');
      expect(letters).toEqual([]);
    });

    test('returns correct number of letters for known puzzle', () => {
      // 12/29/2025 has 16 letters based on the JSON
      const letters = getLetters('12/29/2025');
      expect(letters.length).toBe(16);
    });

    test('letters contain only single characters', () => {
      const letters = getLetters('12/29/2025');
      letters.forEach(letter => {
        expect(letter.length).toBe(1);
      });
    });

    test('letters are alphabetic characters', () => {
      const letters = getLetters('12/29/2025');
      const alphabetRegex = /^[A-Z]$/;
      letters.forEach(letter => {
        expect(alphabetRegex.test(letter)).toBe(true);
      });
    });
  });
});
