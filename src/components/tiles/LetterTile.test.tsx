import React from 'react';
import { render, screen } from '@testing-library/react';
import LetterTile from './LetterTile';
import { DndContext } from '@dnd-kit/core';

// Wrapper component for DndContext
const renderWithDnd = (component: React.ReactElement) => {
  return render(
    <DndContext>
      {component}
    </DndContext>
  );
};

describe('LetterTile Component', () => {
  test('renders letter tile with letter', () => {
    renderWithDnd(<LetterTile id="test-tile" letter="A" inBank={true} />);

    expect(screen.getByText('A')).toBeInTheDocument();
  });

  test('renders with bank tile class when in bank', () => {
    renderWithDnd(<LetterTile id="test-tile" letter="B" inBank={true} />);

    const tile = document.querySelector('.bank.tile');
    expect(tile).toBeInTheDocument();
  });

  test('renders with board-full class when on board', () => {
    renderWithDnd(<LetterTile id="test-tile" letter="C" inBank={false} row={0} col={0} />);

    const tile = document.querySelector('.board-full.tile');
    expect(tile).toBeInTheDocument();
  });

  test('displays correct letter', () => {
    renderWithDnd(<LetterTile id="test-tile" letter="X" inBank={true} />);

    expect(screen.getByText('X')).toBeInTheDocument();
  });

  test('renders multiple tiles with different letters', () => {
    const { container } = render(
      <DndContext>
        <LetterTile id="tile-1" letter="A" inBank={true} />
        <LetterTile id="tile-2" letter="B" inBank={true} />
        <LetterTile id="tile-3" letter="C" inBank={true} />
      </DndContext>
    );

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  test('handles undefined letter gracefully', () => {
    renderWithDnd(<LetterTile id="test-tile" letter={undefined} inBank={true} />);

    // Should render without crashing
    const tile = document.querySelector('.tile');
    expect(tile).toBeInTheDocument();
  });
});
