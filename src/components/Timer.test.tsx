import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Timer from './Timer';

describe('Timer Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders timer with initial time 0:00', () => {
    const mockSetTimeString = jest.fn();
    render(<Timer setTimeString={mockSetTimeString} />);

    expect(screen.getByText('0:00')).toBeInTheDocument();
  });

  test('renders timer with .timer class', () => {
    const mockSetTimeString = jest.fn();
    render(<Timer setTimeString={mockSetTimeString} />);

    const timerElement = document.querySelector('.timer');
    expect(timerElement).toBeInTheDocument();
  });

  test('calls setTimeString with initial time', () => {
    const mockSetTimeString = jest.fn();
    render(<Timer setTimeString={mockSetTimeString} />);

    expect(mockSetTimeString).toHaveBeenCalledWith('0:00');
  });

  test('updates time after 1 second', () => {
    const mockSetTimeString = jest.fn();
    render(<Timer setTimeString={mockSetTimeString} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockSetTimeString).toHaveBeenCalledWith('0:01');
  });

  test('updates time to show minutes correctly', () => {
    const mockSetTimeString = jest.fn();
    render(<Timer setTimeString={mockSetTimeString} />);

    act(() => {
      jest.advanceTimersByTime(60000); // 60 seconds = 1 minute
    });

    expect(mockSetTimeString).toHaveBeenCalledWith('1:00');
  });

  test('pads seconds with leading zero', () => {
    const mockSetTimeString = jest.fn();
    render(<Timer setTimeString={mockSetTimeString} />);

    act(() => {
      jest.advanceTimersByTime(5000); // 5 seconds
    });

    expect(mockSetTimeString).toHaveBeenCalledWith('0:05');
  });

  test('handles multi-minute time correctly', () => {
    const mockSetTimeString = jest.fn();
    render(<Timer setTimeString={mockSetTimeString} />);

    act(() => {
      jest.advanceTimersByTime(125000); // 2 minutes and 5 seconds
    });

    expect(mockSetTimeString).toHaveBeenCalledWith('2:05');
  });
});
