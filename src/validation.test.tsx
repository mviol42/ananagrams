import { boardSize, blankTile } from './App';

/**
 * These tests verify the core validation logic used in the game.
 * The validation logic is replicated here for testing purposes.
 */

// Replicate the validateContinuity logic for testing
const validateContinuity = (boardLetters: string[][]): boolean => {
  let counter = 0;
  const grid: string[][] = [];

  for (let i = 0; i < boardSize; i++) {
    grid[i] = boardLetters[i].slice();
  }

  const dfs = (i: number, j: number) => {
    if (i >= 0 && j >= 0 && i < boardSize && j < boardSize && grid[i][j] !== blankTile) {
      grid[i][j] = ' ';
      dfs(i + 1, j);
      dfs(i, j + 1);
      dfs(i - 1, j);
      dfs(i, j - 1);
    }
  };

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (grid[i][j] !== ' ') {
        counter++;
        dfs(i, j);
      }
    }
  }

  return counter === 1;
};

// Replicate the validateSpelling logic for testing
const dictionary = require('an-array-of-english-words');

const validateSpelling = (boardLetters: string[][]): boolean => {
  const words: string[] = [];

  for (let i = 0; i < boardSize; i++) {
    words.push(boardLetters[i].join(''));
  }

  for (let i = 0; i < boardSize; i++) {
    const column: string[] = [];
    for (let j = 0; j < boardSize; j++) {
      column.push(boardLetters[j][i]);
    }
    words.push(column.join(''));
  }

  const toCheck = words.join('').split(' ');

  for (let i = 0; i < toCheck.length; i++) {
    if (toCheck[i].length > 1 && dictionary.indexOf(toCheck[i].toLowerCase()) === -1) {
      return false;
    }
  }

  return true;
};

// Helper to create empty board
const createEmptyBoard = (): string[][] => {
  return [...Array(boardSize)].map(() => Array(boardSize).fill(blankTile));
};

describe('Validation Logic', () => {
  describe('validateContinuity', () => {
    test('empty board has no connected components', () => {
      const board = createEmptyBoard();
      // Empty board should fail (counter = 0, not 1)
      expect(validateContinuity(board)).toBe(false);
    });

    test('single letter is contiguous', () => {
      const board = createEmptyBoard();
      board[4][4] = 'A';
      expect(validateContinuity(board)).toBe(true);
    });

    test('adjacent horizontal letters are contiguous', () => {
      const board = createEmptyBoard();
      board[4][4] = 'A';
      board[4][5] = 'B';
      board[4][6] = 'C';
      expect(validateContinuity(board)).toBe(true);
    });

    test('adjacent vertical letters are contiguous', () => {
      const board = createEmptyBoard();
      board[3][4] = 'A';
      board[4][4] = 'B';
      board[5][4] = 'C';
      expect(validateContinuity(board)).toBe(true);
    });

    test('L-shaped pattern is contiguous', () => {
      const board = createEmptyBoard();
      board[4][4] = 'A';
      board[4][5] = 'B';
      board[5][5] = 'C';
      expect(validateContinuity(board)).toBe(true);
    });

    test('cross pattern is contiguous', () => {
      const board = createEmptyBoard();
      board[4][4] = 'A';
      board[3][4] = 'B';
      board[5][4] = 'C';
      board[4][3] = 'D';
      board[4][5] = 'E';
      expect(validateContinuity(board)).toBe(true);
    });

    test('disconnected letters are not contiguous', () => {
      const board = createEmptyBoard();
      board[0][0] = 'A';
      board[8][8] = 'B';
      expect(validateContinuity(board)).toBe(false);
    });

    test('diagonally adjacent letters are not connected', () => {
      const board = createEmptyBoard();
      board[4][4] = 'A';
      board[5][5] = 'B';
      expect(validateContinuity(board)).toBe(false);
    });

    test('two separate groups are not contiguous', () => {
      const board = createEmptyBoard();
      // First group
      board[0][0] = 'A';
      board[0][1] = 'B';
      // Second group
      board[8][8] = 'C';
      board[8][7] = 'D';
      expect(validateContinuity(board)).toBe(false);
    });
  });

  describe('validateSpelling', () => {
    test('empty board is valid', () => {
      const board = createEmptyBoard();
      expect(validateSpelling(board)).toBe(true);
    });

    test('single letter is valid', () => {
      const board = createEmptyBoard();
      board[4][4] = 'A';
      expect(validateSpelling(board)).toBe(true);
    });

    test('valid horizontal word is valid', () => {
      const board = createEmptyBoard();
      // Spell "CAT"
      board[4][3] = 'C';
      board[4][4] = 'A';
      board[4][5] = 'T';
      expect(validateSpelling(board)).toBe(true);
    });

    test('valid vertical word is valid', () => {
      const board = createEmptyBoard();
      // Spell "DOG" vertically
      board[3][4] = 'D';
      board[4][4] = 'O';
      board[5][4] = 'G';
      expect(validateSpelling(board)).toBe(true);
    });

    test('invalid horizontal word is invalid', () => {
      const board = createEmptyBoard();
      // Spell "XYZ" - not a word
      board[4][3] = 'X';
      board[4][4] = 'Y';
      board[4][5] = 'Z';
      expect(validateSpelling(board)).toBe(false);
    });

    test('crossword with valid words is valid', () => {
      const board = createEmptyBoard();
      // Create a simple crossword:
      //   C
      // DOG
      //   T
      board[3][4] = 'C';
      board[4][3] = 'D';
      board[4][4] = 'O';
      board[4][5] = 'G';
      board[5][4] = 'T';
      // This forms "DOG" horizontally and "COT" vertically
      expect(validateSpelling(board)).toBe(true);
    });

    test('crossword with invalid intersection is invalid', () => {
      const board = createEmptyBoard();
      // Create crossword where intersection creates invalid word
      //   X
      // CAT
      //   Y
      board[3][4] = 'X';
      board[4][3] = 'C';
      board[4][4] = 'A';
      board[4][5] = 'T';
      board[5][4] = 'Y';
      // "CAT" is valid but "XAY" vertically is not
      expect(validateSpelling(board)).toBe(false);
    });
  });

  describe('Combined Validation', () => {
    const validate = (board: string[][]): boolean => {
      return validateContinuity(board) && validateSpelling(board);
    };

    test('valid crossword puzzle passes', () => {
      const board = createEmptyBoard();
      // Simple valid crossword
      //   C
      // DOG
      //   T
      board[3][4] = 'C';
      board[4][3] = 'D';
      board[4][4] = 'O';
      board[4][5] = 'G';
      board[5][4] = 'T';
      expect(validate(board)).toBe(true);
    });

    test('disconnected valid words fail', () => {
      const board = createEmptyBoard();
      // Two valid words but disconnected
      board[0][0] = 'C';
      board[0][1] = 'A';
      board[0][2] = 'T';

      board[8][6] = 'D';
      board[8][7] = 'O';
      board[8][8] = 'G';

      expect(validate(board)).toBe(false);
    });
  });
});
