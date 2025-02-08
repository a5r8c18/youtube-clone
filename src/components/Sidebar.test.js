import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Sidebar from './Sidebar';
import rootReducer from '../reducers'; // Adjust the path to your rootReducer

// Mock the Link component from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

// Mock initial state
const initialState = {
  app: {
    open: true, // Sidebar is open
  },
};

// Create a store with the configureStore method from Redux Toolkit
const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

describe('Sidebar Component', () => {
  test('renders sidebar items correctly when open', () => {
    const { getByText, container } = render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );

    // Check if the first sidebar item is rendered
    expect(getByText('Home')).toBeInTheDocument();
    expect(container.querySelectorAll('hr').length).toBe(2); // Check if dividers are rendered

    // Check other sidebar items
    expect(getByText('Shorts')).toBeInTheDocument();
    expect(getByText('Subscriptions')).toBeInTheDocument();
    expect(getByText('Explore')).toBeInTheDocument();
    expect(getByText('Library')).toBeInTheDocument();
    expect(getByText('History')).toBeInTheDocument();
    expect(getByText('Playlists')).toBeInTheDocument();
    expect(getByText('Watch Later')).toBeInTheDocument();
    expect(getByText('Liked Videos')).toBeInTheDocument();
    expect(getByText('Show More')).toBeInTheDocument();
  });

  test('applies correct styles when sidebar is open', () => {
    const { container } = render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );
    expect(container.firstChild).toHaveClass('w-64'); // Check if the width class for open sidebar is applied
  });

  test('applies correct styles when sidebar is closed', () => {
    // Create a store with the sidebar closed
    const closedStore = configureStore({
      reducer: rootReducer,
      preloadedState: {
        app: {
          open: false, // Sidebar is closed
        },
      },
    });

    const { container } = render(
      <Provider store={closedStore}>
        <Sidebar />
      </Provider>
    );
    expect(container.firstChild).toHaveClass('w-20'); // Check if the width class for closed sidebar is applied
  });

  test('sidebar items hide titles when sidebar is closed', () => {
    // Create a store with the sidebar closed
    const closedStore = configureStore({
      reducer: rootReducer,
      preloadedState: {
        app: {
          open: false, // Sidebar is closed
        },
      },
    });

    const { container } = render(
      <Provider store={closedStore}>
        <Sidebar />
      </Provider>
    );

    // Check if sidebar item titles are hidden
    const titles = container.querySelectorAll('.text-sm.font-medium');
    titles.forEach(title => {
      expect(title).toHaveClass('hidden');
    });
  });
});
