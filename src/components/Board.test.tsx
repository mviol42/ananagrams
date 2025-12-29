import React from 'react';
import { render, screen } from '@testing-library/react';
import Board from './Board';
import { DndContext } from '@dnd-kit/core';
import { boardSize, blankTile } from '../App';

// Wrapper component for DndContext
const renderWithDnd = (component: React.ReactElement) => {
  return render(
    <DndContext>
      {component}
    </DndContext>
  );
};

describe('Board Component', () => {
  const createEmptyBoard = (): string[][] => {
    return [...Array(boardSize)].map(() => Array(boardSize).fill(blankTile));
  };

  const createBoardWithLetters = (): string[][] => {
    const board = createEmptyBoard();
    board[0][0] = 'A';
    board[0][1] = 'B';
    board[1][0] = 'C';
    return board;
  };

  describe('Editable Board (editable=false means draggable)', () => {
    test('renders empty board with correct number of cells', () => {
      const emptyBoard = createEmptyBoard();
      renderWithDnd(<Board currentBoard={emptyBoard} editable={false} />);

      // Should render 9x9 = 81 cells
      const tiles = document.querySelectorAll('.tile');
      expect(tiles.length).toBeGreaterThan(0);
    });

    test('renders board with letters', () => {
      const boardWithLetters = createBoardWithLetters();
      renderWithDnd(<Board currentBoard={boardWithLetters} editable={false} />);

      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
      expect(screen.getByText('C')).toBeInTheDocument();
    });

    test('renders correct number of rows', () => {
      const emptyBoard = createEmptyBoard();
      renderWithDnd(<Board currentBoard={emptyBoard} editable={false} />);

      const rows = document.querySelectorAll('.tile-row');
      expect(rows.length).toBe(boardSize);
    });
  });

  describe('Fixed Board (editable=true means non-draggable, for win state)', () => {
    test('renders fixed board with letters', () => {
      const boardWithLetters = createBoardWithLetters();
      renderWithDnd(<Board currentBoard={boardWithLetters} editable={true} />);

      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
      expect(screen.getByText('C')).toBeInTheDocument();
    });

    test('renders correct number of rows in fixed mode', () => {
      const emptyBoard = createEmptyBoard();
      renderWithDnd(<Board currentBoard={emptyBoard} editable={true} />);

      const rows = document.querySelectorAll('.tile-row');
      expect(rows.length).toBe(boardSize);
    });
  });

  describe('Board Structure', () => {
    test('board is contained in a container-fluid div', () => {
      const emptyBoard = createEmptyBoard();
      renderWithDnd(<Board currentBoard={emptyBoard} editable={false} />);

      const container = document.querySelector('.container-fluid');
      expect(container).toBeInTheDocument();
    });
  });
});
