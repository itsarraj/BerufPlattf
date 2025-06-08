import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axios';
import UserStats from '../pages/UserStats';

// Mock dependencies
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock('../api/axios', () => ({
  get: jest.fn(),
}));

// Mock store setup
const createMockStore = (preloadedState) =>
  configureStore({
    reducer: {
      session: (state = preloadedState?.session || {}, action) => state,
    },
    preloadedState,
  });

describe('UserStats Component', () => {
  let store;
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const oneMonthAgo = new Date(yesterday);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  // Format dates to YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split('T')[0];
  const yesterdayStr = formatDate(yesterday);
  const oneMonthAgoStr = formatDate(oneMonthAgo);

  beforeAll(() => {
    // Mock for CSV export
    global.URL.createObjectURL = jest.fn();
    global.URL.revokeObjectURL = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();

    // Default store with permissions
    store = createMockStore({
      session: {
        user: {
          roles: [
            {
              name: 'Admin',
              access: [{ module: 'UserStats', levels: ['Read'] }],
            },
          ],
        },
      },
    });

    // Mock API responses
    axiosInstance.get
      .mockResolvedValueOnce({
        // Statistics API (default tab)
        data: [
          {
            UniqueUserCount: 0,
            NewUserCount: 0,
            ReturningUserCount: 0,
            ActiveUserCount: 0,
            RecurringUserCount: 0,
            OneShotUserCount: 0,
          },
        ],
      })
      .mockResolvedValueOnce({
        // Reactions API
        data: {
          positiveRowCount: 0,
          negativeRowCount: 0,
          otherRowCount: 0,
        },
      });
  });

  const renderComponent = () => {
    render(
      <Provider store={store}>
        <UserStats />
      </Provider>
    );
  };

  test('fetches and displays reaction counts', async () => {
    // Initial render - staggVGtistics tab
    renderComponent();

    fireEvent.click(await screen.findByText('Reactions'));
    // Wait for initial statistics fetch to complete
    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/stats/reactions', {
        params: { from: oneMonthAgoStr, to: yesterdayStr },
      });
    });

    // Switch to Reactions tab - this will trigger automatic fetch
    fireEvent.click(screen.getByText('Reactions'));

    // Mock the reactions response for the automatic fetch
    axiosInstance.get.mockResolvedValueOnce({
      data: {
        positiveRowCount: 5,
        negativeRowCount: 2,
        otherRowCount: 3,
      },
    });

    // Wait for automatic reactions fetch to complete
    await waitFor(() => {
      expect(axiosInstance.get).toBeenCalledWith('/api/stats/reactions', {
        params: { from: oneMonthAgoStr, to: yesterdayStr },
      });
    });

    // Now mock a new response for the manual fetch we're about to trigger
    axiosInstance.get.mockResolvedValueOnce({
      data: {
        positiveRowCount: 9,
        negativeRowCount: 4,
        otherRowCount: 11,
      },
    });

    // Now the "Get Reactions" button should be clickable again
    fireEvent.click(screen.getByText('Get Reactions'));

    // Wait for manual reactions fetch to complete
    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/stats/reactions', {
        params: { from: oneMonthAgoStr, to: yesterdayStr },
      });
    });

    // Verify the updated reaction values
    expect(await screen.findByText('9')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('11')).toBeInTheDocument();
  });
});
