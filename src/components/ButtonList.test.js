import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { legacy_createStore as configureStore } from 'redux-mock-store';
import ButtonList from './ButtonList';
import { setCategory } from '../utils/appSlice';

const mockStore = configureStore([]);
const initialState = {
  app: {
    category: "All"
  }
};

describe('ButtonList Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  test('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ButtonList />
      </Provider>
    );

    // Check if the first button is rendered
    expect(getByText('All')).toBeInTheDocument();
  });

  test('dispatches setCategory action on button click', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ButtonList />
      </Provider>
    );

    // Simulate button click
    fireEvent.click(getByText('Javascript'));

    // Check if setCategory action is dispatched
    expect(store.dispatch).toHaveBeenCalledWith(setCategory('Javascript'));
  });

  test('scrolls to the right on right scroll button click', () => {
    const { container, getByRole } = render(
      <Provider store={store}>
        <ButtonList />
      </Provider>
    );

    const scrollContainer = container.querySelector('.overflow-x-auto');
    const scrollRightButton = getByRole('button', { name: /GrNext/i });

    // Mock scrollLeft value
    Object.defineProperty(scrollContainer, 'scrollLeft', { value: 0, writable: true });
    Object.defineProperty(scrollContainer, 'scrollWidth', { value: 1000 });
    Object.defineProperty(scrollContainer, 'clientWidth', { value: 500 });

    // Simulate scroll right button click
    fireEvent.click(scrollRightButton);

    // Check if scrollLeft value is updated
    expect(scrollContainer.scrollLeft).toBe(150);
  });

  test('scrolls to the left on left scroll button click', () => {
    const { container, getByRole } = render(
      <Provider store={store}>
        <ButtonList />
      </Provider>
    );

    const scrollContainer = container.querySelector('.overflow-x-auto');
    const scrollLeftButton = getByRole('button', { name: /GrPrevious/i });

    // Mock scrollLeft value
    Object.defineProperty(scrollContainer, 'scrollLeft', { value: 150, writable: true });
    Object.defineProperty(scrollContainer, 'scrollWidth', { value: 1000 });
    Object.defineProperty(scrollContainer, 'clientWidth', { value: 500 });

    // Simulate scroll left button click
    fireEvent.click(scrollLeftButton);

    // Check if scrollLeft value is updated
    expect(scrollContainer.scrollLeft).toBe(0);
  });
});
