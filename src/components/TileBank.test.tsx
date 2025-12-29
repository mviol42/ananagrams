import React from 'react';
import { render, screen } from '@testing-library/react';
import TileBank from './TileBank';
import { DndContext } from '@dnd-kit/core';

// Wrapper component for DndContext
const renderWithDnd = (component: React.ReactElement) => {
  return render(
    <DndContext>
      {component}
    </DndContext>
  );
};

describe('TileBank Component', () => {
  test('renders empty tile bank', () => {
    renderWithDnd(<TileBank bank={[]} />);

    const dropBox = document.querySelector('.drop-box');
    expect(dropBox).toBeInTheDocument();
  });

  test('renders tile bank with letters', () => {
    const letters = ['A', 'B', 'C', 'D'];
    renderWithDnd(<TileBank bank={letters} />);

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  test('renders correct number of tiles', () => {
    const letters = ['A', 'B', 'C', 'D', 'E'];
    renderWithDnd(<TileBank bank={letters} />);

    const tiles = document.querySelectorAll('.bank.tile');
    expect(tiles.length).toBe(5);
  });

  test('renders tile bank container', () => {
    renderWithDnd(<TileBank bank={['A']} />);

    const container = document.querySelector('.container');
    expect(container).toBeInTheDocument();
  });

  test('handles many letters', () => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
    renderWithDnd(<TileBank bank={letters} />);

    letters.forEach(letter => {
      expect(screen.getByText(letter)).toBeInTheDocument();
    });
  });

  test('renders duplicate letters correctly', () => {
    const letters = ['A', 'A', 'B', 'B'];
    renderWithDnd(<TileBank bank={letters} />);

    const allAs = screen.getAllByText('A');
    const allBs = screen.getAllByText('B');
    expect(allAs.length).toBe(2);
    expect(allBs.length).toBe(2);
  });
});
