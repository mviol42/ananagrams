import React from 'react';
import { render, screen } from '@testing-library/react';
import UndraggableLetterTile from './UndraggableLetterTile';

describe('UndraggableLetterTile Component', () => {
  test('renders letter tile with letter', () => {
    render(<UndraggableLetterTile id="test-tile" letter="A" inBank={false} row={0} col={0} />);

    expect(screen.getByText('A')).toBeInTheDocument();
  });

  test('renders with fixed-letter class', () => {
    render(<UndraggableLetterTile id="test-tile" letter="B" inBank={false} row={0} col={0} />);

    const tile = document.querySelector('.fixed-letter.tile');
    expect(tile).toBeInTheDocument();
  });

  test('displays correct letter', () => {
    render(<UndraggableLetterTile id="test-tile" letter="X" inBank={false} row={0} col={0} />);

    expect(screen.getByText('X')).toBeInTheDocument();
  });

  test('renders multiple tiles with different letters', () => {
    const { container } = render(
      <>
        <UndraggableLetterTile id="tile-1" letter="A" inBank={false} row={0} col={0} />
        <UndraggableLetterTile id="tile-2" letter="B" inBank={false} row={0} col={1} />
        <UndraggableLetterTile id="tile-3" letter="C" inBank={false} row={0} col={2} />
      </>
    );

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  test('has correct CSS classes', () => {
    render(<UndraggableLetterTile id="test-tile" letter="D" inBank={false} row={0} col={0} />);

    const tile = document.querySelector('.tile');
    expect(tile).toHaveClass('fixed-letter');
    expect(tile).toHaveClass('tile');
  });

  test('handles undefined letter gracefully', () => {
    render(<UndraggableLetterTile id="test-tile" letter={undefined} inBank={false} row={0} col={0} />);

    // Should render without crashing
    const tile = document.querySelector('.tile');
    expect(tile).toBeInTheDocument();
  });
});
