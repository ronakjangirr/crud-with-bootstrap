import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

// Mock axios
jest.mock('axios');

describe('App', () => {
  test('displays loading message while fetching data', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(<App />);
    expect(screen.getByText(/loading... please wait./i)).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText(/loading... please wait./i)).not.toBeInTheDocument());
  });

  test('displays no data message when no data is available', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(<App />);
    await waitFor(() => expect(screen.getByText(/no data available/i)).toBeInTheDocument());
  });

  test('displays data when data is available', async () => {
    const mockData = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ];
    axios.get.mockResolvedValue({ data: mockData });

    render(<App />);
    await waitFor(() => {
      mockData.forEach((item) => {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      });
    });
  });

  test('logs error when fetching data fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    axios.get.mockRejectedValue(new Error('Fetching error'));

    render(<App />);
    await waitFor(() => expect(consoleErrorSpy).toHaveBeenCalled());

    consoleErrorSpy.mockRestore();
  });
});
