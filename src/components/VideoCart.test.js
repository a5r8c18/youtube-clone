import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import VideoCart from './VideoCart';

// Mocking the axios module
jest.mock('axios');

const item = {
  snippet: {
    channelId: 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
    title: 'Test Video',
    channelTitle: 'Test Channel',
    thumbnails: {
      medium: {
        url: 'https://i.ytimg.com/vi/abc123/default.jpg'
      }
    }
  }
};

const viewCount = '1234';

describe('VideoCart Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with given props', async () => {
    axios.get.mockResolvedValue({
      data: {
        items: [
          {
            snippet: {
              thumbnails: {
                high: {
                  url: 'https://yt3.ggpht.com/a-/AOh14GgE9N8kKQkY8s0lK4mFvQ6cDR3ZwEGFGyITAg=s240-mo-c-c0xffffffff-rj-k-no'
                }
              }
            }
          }
        ]
      }
    });

    render(<VideoCart item={item} viewCount={viewCount} />);

    // Check if the video thumbnail is rendered
    expect(screen.getByAltText('ytvideo')).toBeInTheDocument();
    expect(screen.getByAltText('ytvideo')).toHaveAttribute('src', item.snippet.thumbnails.medium.url);

    // Check if the video title, channel title, and view count are rendered
    expect(screen.getByText(item.snippet.title)).toBeInTheDocument();
    expect(screen.getByText(item.snippet.channelTitle)).toBeInTheDocument();
    expect(screen.getByText(`${viewCount} views`)).toBeInTheDocument();

    // Wait for the axios call to resolve and check if the avatar is rendered
    await waitFor(() => {
      const avatar = screen.getByRole('img', { hidden: true });
      expect(avatar).toHaveAttribute('src', 'https://yt3.ggpht.com/a-/AOh14GgE9N8kKQkY8s0lK4mFvQ6cDR3ZwEGFGyITAg=s240-mo-c-c0xffffffff-rj-k-no');
    });
  });

  test('handles API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));

    render(<VideoCart item={item} viewCount={viewCount} />);

    // Check if the video thumbnail is rendered
    expect(screen.getByAltText('ytvideo')).toBeInTheDocument();
    expect(screen.getByAltText('ytvideo')).toHaveAttribute('src', item.snippet.thumbnails.medium.url);

    // Check if the video title, channel title, and view count are rendered
    expect(screen.getByText(item.snippet.title)).toBeInTheDocument();
    expect(screen.getByText(item.snippet.channelTitle)).toBeInTheDocument();
    expect(screen.getByText(`${viewCount} views`)).toBeInTheDocument();

    // Wait for the axios call to reject and check if the avatar is not rendered
    await waitFor(() => {
      const avatar = screen.queryByRole('img', { hidden: true });
      expect(avatar).not.toBeInTheDocument();
    });
  });
});
