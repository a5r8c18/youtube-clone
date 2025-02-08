import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers'; // Make sure this points to your combined reducers
import Feed from './Feed';


// Mock the ButtonList and VideoPlayer components
jest.mock('./ButtonList', () => () => <div>ButtonList</div>);
jest.mock('../pages/VideoPlayer', () => () => <div>VideoPlayer</div>);

// Create a store with the configureStore method from Redux Toolkit
const store = configureStore({
  reducer: rootReducer,
});

describe('Feed Component', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Feed />
      </Provider>
    );

    // Check if the ButtonList component is rendered
    expect(getByText('ButtonList')).toBeInTheDocument();

    // Check if the VideoPlayer component is rendered
    expect(getByText('VideoPlayer')).toBeInTheDocument();
  });

  test('applies the correct styles', () => {
    const { container } = render(
      <Provider store={store}>
        <Feed />
      </Provider>
    );
    expect(container.firstChild).toHaveClass('ml-5 mr-5 w-[80%] dark:bg-gray-900 dark:text-white');
  });
});
