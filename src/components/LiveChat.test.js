import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LiveChat from './LiveChat';
import chatReducer from '../utils/chatSlice';
import * as helper from '../utils/helper';

// Mock the ChatMessage component
jest.mock('./ChatMessage', () => ({ item }) => (
  <div>
    <span>{item.name}</span>
    <span>{item.message}</span>
  </div>
));

// Mock helper functions
jest.spyOn(helper, 'generateRandomName').mockReturnValue('RandomUser');
jest.spyOn(helper, 'generateRandomMessage').mockReturnValue('Random message');

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

describe('LiveChat Component', () => {
  test('renders correctly', () => {
    render(
      <Provider store={store}>
        <LiveChat />
      </Provider>
    );

    // Check if the initial state is rendered correctly
    expect(screen.getByText('RandomUser')).toBeInTheDocument();
    expect(screen.getByText('Random message')).toBeInTheDocument();
  });

  test('dispatches setMessage action every second', async () => {
    jest.useFakeTimers();

    render(
      <Provider store={store}>
        <LiveChat />
      </Provider>
    );

    // Fast-forward time by 1 second
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      // Check if the setMessage action is dispatched and the message is rendered
      expect(screen.getByText('RandomUser')).toBeInTheDocument();
      expect(screen.getByText('Random message')).toBeInTheDocument();
    });

    // Cleanup timers
    jest.useRealTimers();
  });
});
