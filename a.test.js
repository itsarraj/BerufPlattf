import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
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
      .mockResolvedValueOnce({  // Statistics API (default tab)
        data: [{
          UniqueUserCount: 0,
          NewUserCount: 0,
          ReturningUserCount: 0,
          ActiveUserCount: 0,
          RecurringUserCount: 0,
          OneShotUserCount: 0
        }]
      })
      .mockResolvedValueOnce({  // Reactions API
        data: {
          positiveRowCount: 0,
          negativeRowCount: 0,
          otherRowCount: 0
        }
      });
  });

  const renderComponent = () => {
    render(
      <Provider store={store}>
        <UserStats />
      </Provider>
    );
  };

  // Test Case 1: Access Denied
  test('shows access denied without permissions', () => {
    // Remove permissions
    store = createMockStore({
      session: { user: { roles: [] } }
    });

    renderComponent();
    expect(screen.getByText('Access Denied')).toBeInTheDocument();
  });

  // Test Case 2: Default Rendering
  test('renders correctly with permissions', async () => {
    renderComponent();

    // Wait for initial load to complete
    await waitFor(() => {
      expect(screen.getByText('Statistics')).toBeInTheDocument();
      expect(screen.getByText('Reactions')).toBeInTheDocument();
      expect(screen.getByLabelText('Start Date:')).toHaveValue(oneMonthAgoStr);
      expect(screen.getByLabelText('End Date:')).toHaveValue(yesterdayStr);
    });
  });

  // Test Case 3: Tab Switching
  test('switches between tabs', async () => {
    renderComponent();

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('Statistics')).toBeInTheDocument();
    });

    // Initial active tab is Statistics
    expect(screen.getByText('Statistics').closest('button')).toHaveClass('bg-blue-600');

    // Switch to Reactions
    fireEvent.click(screen.getByText('Reactions'));
    expect(screen.getByText('Reactions').closest('button')).toHaveClass('bg-blue-600');
  });

  // Test Case 4: Date Validation
  test('validates date ranges', async () => {
    renderComponent();

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByText('Get Stats')).toBeInTheDocument();
    });

    // Set invalid dates
    fireEvent.change(screen.getByLabelText('Start Date:'), {
      target: { value: yesterdayStr }
    });
    fireEvent.change(screen.getByLabelText('End Date:'), {
      target: { value: oneMonthAgoStr }
    });

    fireEvent.click(screen.getByText('Get Stats'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Start date cannot be greater than end date'
      );
    });
  });

  // Test Case 5: Statistics API Data Fetching
  test('fetches and displays statistics data', async () => {
    // Set up specific statistics response
    axiosInstance.get.mockReset();
    axiosInstance.get
      .mockResolvedValueOnce({  // Statistics API
        data: [{
          ActiveUserCount: 15,
          UniqueUserCount: 72,
          NewUserCount: 44,
          ReturningUserCount: 28,
          RecurringUserCount: 20,
          OneShotUserCount: 52
        }]
      });

    renderComponent();

    // Wait for statistics API call
    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/stats/users', {
        params: { from: oneMonthAgoStr, to: yesterdayStr }
      });
    });

    // Verify statistics values
    expect(await screen.findByText('15')).toBeInTheDocument();
    expect(screen.getByText('72')).toBeInTheDocument();
    expect(screen.getByText('44')).toBeInTheDocument();
    expect(screen.getByText('28')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('52')).toBeInTheDocument();
  });

  // Test Case 6: Reactions API Data Fetching
  test('fetches and displays reaction counts', async () => {
    // Switch to Reactions tab
    renderComponent();
    fireEvent.click(await screen.findByText('Reactions'));

    // Set up specific reactions response
    axiosInstance.get.mockReset();
    axiosInstance.get.mockResolvedValueOnce({
      data: {
        positiveRowCount: 9,
        negativeRowCount: 4,
        otherRowCount: 11
      }
    });

    // Trigger reactions fetch
    fireEvent.click(screen.getByText('Get Reactions'));

    // Wait for reactions API call
    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/stats/reactions', {
        params: { from: oneMonthAgoStr, to: yesterdayStr }
      });
    });

    // Verify reaction values
    expect(await screen.findByText('9')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('11')).toBeInTheDocument();
  });

  // Test Case 7: CSV Export
  test('exports reactions data to CSV', async () => {
    // Switch to Reactions tab
    renderComponent();
    fireEvent.click(await screen.findByText('Reactions'));

    // Set up API responses
    axiosInstance.get.mockReset();
    axiosInstance.get
      .mockResolvedValueOnce({  // Initial reactions fetch
        data: {
          positiveRowCount: 9,
          negativeRowCount: 4,
          otherRowCount: 11
        }
      })
      .mockResolvedValueOnce({  // Export API
        data: [
          { UserID: '123', Reaction: 'like' },
          { UserID: '456', Reaction: 'dislike' }
        ]
      });

    // Trigger reactions fetch
    fireEvent.click(screen.getByText('Get Reactions'));
    await waitFor(() => expect(screen.getByText('9')).toBeInTheDocument());

    // Trigger export
    fireEvent.click(screen.getByText('Export to CSV'));

    // Verify export process
    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith(
        '/api/stats/reactionsExport',
        { params: { from: oneMonthAgoStr, to: yesterdayStr } }
      );
      expect(global.URL.createObjectURL).toHaveBeenCalled();
    });
  });

  // Test Case 8: Statistics Loading States
  test('disables buttons during statistics loading', async () => {
    // Create a controlled promise for the loading test
    let resolvePromise;
    const promise = new Promise(res => resolvePromise = res);

    axiosInstance.get.mockReset();
    axiosInstance.get
      .mockResolvedValueOnce({ data: [] }) // Initial statistics
      .mockReturnValueOnce(promise); // Manual statistics fetch

    renderComponent();

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('Get Stats')).toBeInTheDocument();
    });

    // Trigger manual fetch
    fireEvent.click(screen.getByText('Get Stats'));

    // Verify loading state
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByText('Get Stats')).toBeDisabled();
    });

    // Resolve API call
    resolvePromise({ data: [] });

    // Verify buttons are re-enabled
    await waitFor(() => {
      expect(screen.getByText('Get Stats')).toBeEnabled();
    });
  });

  // Test Case 9: Reactions Loading States
  test('disables buttons during reactions loading', async () => {
    // Create a controlled promise for the loading test
    let resolvePromise;
    const promise = new Promise(res => resolvePromise = res);

    // Switch to Reactions tab
    renderComponent();
    fireEvent.click(await screen.findByText('Reactions'));

    axiosInstance.get.mockReset();
    axiosInstance.get
      .mockResolvedValueOnce({ data: {} }) // Initial reactions
      .mockReturnValueOnce(promise); // Manual reactions fetch

    // Trigger manual fetch
    fireEvent.click(screen.getByText('Get Reactions'));

    // Verify loading state
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByText('Get Reactions')).toBeDisabled();
      expect(screen.getByText('Export to CSV')).toBeDisabled();
    });

    // Resolve API call
    resolvePromise({ data: {} });

    // Verify buttons are re-enabled
    await waitFor(() => {
      expect(screen.getByText('Get Reactions')).toBeEnabled();
    });
  });

  // Test Case 10: Statistics Error Handling
  test('handles statistics API errors', async () => {
    axiosInstance.get.mockReset();
    axiosInstance.get.mockRejectedValueOnce(new Error('API error'));

    renderComponent();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to fetch statistics data');
    });
  });

  // Test Case 11: Reactions Error Handling
  test('handles reactions API errors', async () => {
    // Switch to Reactions tab
    renderComponent();
    fireEvent.click(await screen.findByText('Reactions'));

    axiosInstance.get.mockReset();
    axiosInstance.get.mockRejectedValueOnce(new Error('API error'));

    // Trigger reactions fetch
    fireEvent.click(screen.getByText('Get Reactions'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to fetch reactions data');
    });
  });

  // Test Case 12: Statistics No Data State
  test('shows no data message for statistics', async () => {
    axiosInstance.get.mockReset();
    axiosInstance.get.mockResolvedValueOnce({ data: [] });

    renderComponent();

    expect(await screen.findByText(/No statistics data available/)).toBeInTheDocument();
  });

  // Test Case 13: Reactions No Data State
  test('shows no data message for reactions', async () => {
    // Switch to Reactions tab
    renderComponent();
    fireEvent.click(await screen.findByText('Reactions'));

    axiosInstance.get.mockReset();
    axiosInstance.get.mockResolvedValueOnce({ data: {} });

    // Trigger reactions fetch
    fireEvent.click(screen.getByText('Get Reactions'));

    expect(await screen.findByText(/No reactions data available/)).toBeInTheDocument();
  });
});