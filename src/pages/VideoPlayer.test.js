import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
import rootReducer from '../reducers'; // Adjust the path to your rootReducer

// Mocking the axios module
jest.mock('axios');

// Mock initial state
const initialState = {
  app: {
    video: [],
    category: 'All',
  },
};

// Create a store with the configureStore method from Redux Toolkit
const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

describe('VideoPlayer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly and fetches video data', async () => {
    axios.get.mockResolvedValue({
      data: {
        items: [
          {
            id: 'testVideoId1',
            snippet: {
              title: 'Test Video Title 1',
              channelId: 'testChannelId1',
              channelTitle: 'Test Channel Title 1',
              thumbnails: {
                medium: {
                  url: 'https://i.ytimg.com/vi/abc123/default.jpg',
                },
              },
              description: 'Test video description 1',
            },
            statistics: {
              viewCount: '12345',
            },
          },
          {
            id: 'testVideoId2',
            snippet: {
              title: 'Test Video Title 2',
              channelId: 'testChannelId2',
              channelTitle: 'Test Channel Title 2',
              thumbnails: {
                medium: {
                  url: 'https://i.ytimg.com/vi/xyz456/default.jpg',
                },
              },
              description: 'Test video description 2',
            },
            statistics: {
              viewCount: '67890',
            },
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <VideoPlayer />
      </Provider>
    );

    // Wait for video data to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText('Test Video Title 1')).toBeInTheDocument();
      expect(screen.getByText('Test Video Title 2')).toBeInTheDocument();
      expect(screen.getByText('Test Channel Title 1')).toBeInTheDocument();
      expect(screen.getByText('Test Channel Title 2')).toBeInTheDocument();
      expect(screen.getByText('12345 views')).toBeInTheDocument();
      expect(screen.getByText('67890 views')).toBeInTheDocument();
    });
  });

  test('displays videos in a grid', async () => {
    axios.get.mockResolvedValue({
      data: {
        items: [
          {
            id: 'testVideoId1',
            snippet: {
              title: 'Test Video Title 1',
              channelId: 'testChannelId1',
              channelTitle: 'Test Channel Title 1',
              thumbnails: {
                medium: {
                  url: 'https://i.ytimg.com/vi/abc123/default.jpg',
                },
              },
              description: 'Test video description 1',
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
        <VideoPlayer />
      </Provider>
    );

    // Wait for video data to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText('Test Video Title 1')).toBeInTheDocument();
    });

    // Check if videos are displayed in a grid
    const grid = screen.getByRole('grid');
    expect(grid).toHaveClass('grid grid-cols-3 gap-3 dark:bg-gray-900 dark:text-white');
  });
});
