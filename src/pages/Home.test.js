import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Home from './Home';
import rootReducer from '../reducers'; // Adjust the path to your rootReducer
import axios from 'axios';
import { setCategory } from '../utils/appSlice';

// Mocking the axios module
jest.mock('axios');

// Mock initial state
const initialState = {
  app: {
    searchSuggestion: [],
  },
};

// Create a store with the configureStore method from Redux Toolkit
const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly and handles input changes', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Check if the input field is rendered and handle input change
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'Test Search' } });
    expect(input).toHaveValue('Test Search');
  });

  test('dispatches setCategory action on search button click', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Simulate entering a search term and clicking the search button
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'Test Search' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    // Check if the setCategory action is dispatched
    expect(store.getActions()).toContainEqual(setCategory('Test Search'));
  });

  test('fetches and displays search suggestions', async () => {
    axios.get.mockResolvedValue({
      data: [
        'Test',
        ['Test Suggestion 1', 'Test Suggestion 2'],
      ],
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Simulate entering a search term
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'Test' } });

    // Wait for search suggestions to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Test Suggestion 1')).toBeInTheDocument();
      expect(screen.getByText('Test Suggestion 2')).toBeInTheDocument();
    });
  });

  test('toggles dark mode', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Check initial dark mode state
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Simulate clicking the dark mode toggle button
    fireEvent.click(screen.getByRole('button', { name: /dark mode/i }));

    // Check if dark mode is enabled
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
