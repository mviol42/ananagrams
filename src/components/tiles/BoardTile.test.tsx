import React from 'react';
import { render } from '@testing-library/react';
import BoardTile from './BoardTile';

describe('BoardTile Component', () => {
  test('renders empty board tile', () => {
    render(<BoardTile />);

    const tile = document.querySelector('.board-empty.tile');
    expect(tile).toBeInTheDocument();
  });

  test('has correct CSS classes', () => {
    render(<BoardTile />);

    const tile = document.querySelector('.tile');
    expect(tile).toHaveClass('board-empty');
    expect(tile).toHaveClass('tile');
  });

  test('renders as a div element', () => {
    const { container } = render(<BoardTile />);

    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
  });
});
