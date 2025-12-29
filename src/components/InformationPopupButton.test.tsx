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

  test('shows tooltip on hover', async () => {
    render(<InformationPopupButton />);

    const button = screen.getByText('Ananagrams');
    fireEvent.mouseOver(button);

    await waitFor(() => {
      expect(screen.getByText(/Welcome to Ananagrams!/i)).toBeInTheDocument();
    });
  });

  test('tooltip contains game instructions', async () => {
    render(<InformationPopupButton />);

    const button = screen.getByText('Ananagrams');
    fireEvent.mouseOver(button);

    await waitFor(() => {
      expect(screen.getByText(/Each day, you'll be dealt letter tiles/i)).toBeInTheDocument();
    });
  });

  test('tooltip mentions validation', async () => {
    render(<InformationPopupButton />);

    const button = screen.getByText('Ananagrams');
    fireEvent.mouseOver(button);

    await waitFor(() => {
      expect(screen.getByText(/click "Validate"/i)).toBeInTheDocument();
    });
  });
});
