import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App, { boardSize, blankTile } from './App';

// Mock the daily puzzle reader
jest.mock('./utils/DailyPuzzles/DailyPuzzleReader', () => ({
  getLetters: () => ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']
}));

describe('App Component', () => {
  test('renders the game board', () => {
    render(<App />);
    const boardElement = document.querySelector('.board-section');
    expect(boardElement).toBeInTheDocument();
  });

  test('renders the controls section', () => {
    render(<App />);
    const controlsElement = document.querySelector('.controls-section');
    expect(controlsElement).toBeInTheDocument();
  });

  test('renders clear button', () => {
    render(<App />);
    const clearButton = screen.getByText(/Clear/i);
    expect(clearButton).toBeInTheDocument();
  });

  test('renders validate button', () => {
    render(<App />);
    const validateButton = screen.getByText(/Check grid!/i);
    expect(validateButton).toBeInTheDocument();
  });

  test('validate button is disabled when tiles remain in bank', () => {
    render(<App />);
    const validateButton = screen.getByText(/Check grid!/i);
    expect(validateButton).toBeDisabled();
  });

  test('renders information popup button', () => {
    render(<App />);
    const infoButton = document.querySelector('.popup-button');
    expect(infoButton).toBeInTheDocument();
  });

  test('renders timer', () => {
    render(<App />);
    const timerElement = document.querySelector('.timer');
    expect(timerElement).toBeInTheDocument();
  });

  test('board has correct size', () => {
    expect(boardSize).toBe(9);
  });

  test('blank tile is a space', () => {
    expect(blankTile).toBe(' ');
  });
});

describe('App Constants', () => {
  test('boardSize is 9', () => {
    expect(boardSize).toBe(9);
  });

  test('blankTile is a single space', () => {
    expect(blankTile).toBe(' ');
    expect(blankTile.length).toBe(1);
  });
});
