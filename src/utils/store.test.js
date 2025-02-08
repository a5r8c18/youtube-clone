import store from './store'; // Adjust the path according to your project structure
import { setCategory } from './appSlice';
import { setMessage } from './chatSlice';

describe('Redux Store', () => {
  test('should have the correct initial state', () => {
    const state = store.getState();
    expect(state.app).toEqual({
      open: true,
      video: [],
      category: 'All',
      searchSuggestion: [],
    });
    expect(state.chat).toEqual({
      message: [],
    });
  });

  test('should handle actions correctly', () => {
    // Dispatch setCategory action
    store.dispatch(setCategory('Music'));
    let state = store.getState();
    expect(state.app.category).toBe('Music');

    // Dispatch setMessage action
    store.dispatch(setMessage({ name: 'User', message: 'Hello World' }));
    state = store.getState();
    expect(state.chat.message).toContainEqual({ name: 'User', message: 'Hello World' });
  });
});
