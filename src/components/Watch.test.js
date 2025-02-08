import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Watch from './Watch';
import rootReducer from '../reducers'; // Adjust the path to your rootReducer

// Mocking the axios module
jest.mock('axios');

// Mocking the useSearchParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));

// Mocking the LiveChat component
jest.mock('./LiveChat', () => () => <div>LiveChat</div>);

// Mock initial state
const initialState = {
  app: {
    open: true,
  },
  chat: {
    message: [],
  },
};

// Create a store with the configureStore method from Redux Toolkit
const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

describe('Watch Component', () => {
  beforeEach(() => {
    useSearchParams.mockReturnValue([{ get: () => 'testVideoId' }]);
    jest.clearAllMocks();
  });

  test('renders correctly and fetches video data', async () => {
    axios.get.mockResolvedValue({
      data: {
        items: [
          {
            snippet: {
              title: 'Test Video Title',
              channelId: 'testChannelId',
              channelTitle: 'Test Channel Title',
              thumbnails: {
                medium: {
                  url: 'https://i.ytimg.com/vi/abc123/default.jpg',
                },
              },
              description: 'Test video description',
            },
            statistics: {
              viewCount: '12345',
            },
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Watch />
      </Provider>
    );

    // Check if the iframe is rendered with the correct src
    const iframe = screen.getByTitle('YouTube video player');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/testVideoId?&autoplay=0');

    // Wait for video data to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText('Test Video Title')).toBeInTheDocument();
      expect(screen.getByText('Test Channel Title')).toBeInTheDocument();
      expect(screen.getByText('12345 views')).toBeInTheDocument();
      expect(screen.getByText('Test video description')).toBeInTheDocument();
    });
  });

  test('handles like and dislike button clicks', () => {
    render(
      <Provider store={store}>
        <Watch />
      </Provider>
    );

    // Simulate like button click
    fireEvent.click(screen.getByRole('button', { name: /like/i }));
    expect(screen.getByRole('button', { name: /like/i })).toHaveClass('liked');

    // Simulate dislike button click
    fireEvent.click(screen.getByRole('button', { name: /dislike/i }));
    expect(screen.getByRole('button', { name: /dislike/i })).toHaveClass('disliked');
  });

  test('sends a message in the chat', () => {
    render(
      <Provider store={store}>
        <Watch />
      </Provider>
    );

    // Simulate entering a message and clicking the send button
    fireEvent.change(screen.getByPlaceholderText('Send message...'), { target: { value: 'Test message' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    // Check if the message is sent and the input field is cleared
    expect(screen.getByPlaceholderText('Send message...')).toHaveValue('');
  });
});
