import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InformationPopupButton from './InformationPopupButton';

describe('InformationPopupButton Component', () => {
  test('renders "Ananagrams" button', () => {
    render(<InformationPopupButton />);

    const button = screen.getByText('Ananagrams');
    expect(button).toBeInTheDocument();
  });

  test('renders with popup-button class', () => {
    render(<InformationPopupButton />);

    const button = document.querySelector('.popup-button');
    expect(button).toBeInTheDocument();
  });

  test('is wrapped in InformationPopup div', () => {
    render(<InformationPopupButton />);

    const container = document.querySelector('.InformationPopup');
    expect(container).toBeInTheDocument();
  });

  test('button is clickable', () => {
    render(<InformationPopupButton />);

    const button = screen.getByText('Ananagrams');
    expect(() => fireEvent.click(button)).not.toThrow();
  });

  test('shows modal on click', async () => {
    render(<InformationPopupButton />);

    const button = screen.getByText('Ananagrams');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Welcome to Ananagrams!/i)).toBeInTheDocument();
    });
  });

  test('modal contains game instructions', async () => {
    render(<InformationPopupButton />);

    const button = screen.getByText('Ananagrams');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Every day you get a new set of letters/i)).toBeInTheDocument();
    });
  });

  test('modal mentions validation', async () => {
    render(<InformationPopupButton />);

    const button = screen.getByText('Ananagrams');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/hit "Check grid!"/i)).toBeInTheDocument();
    });
  });
});
