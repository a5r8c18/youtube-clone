import chatReducer, { setMessage } from './chatSlice'; // Adjust the path according to your project structure

describe('chatSlice', () => {
  const initialState = {
    message: [],
  };

  test('should return the initial state', () => {
    expect(chatReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle setMessage and maintain a maximum of 100 messages', () => {
    const previousState = { ...initialState, message: Array(100).fill({ name: 'User', message: 'Test Message' }) };
    const newMessage = { name: 'New User', message: 'New Test Message' };

    // Dispatch setMessage action
    const newState = chatReducer(previousState, setMessage(newMessage));

    // Check if the new message is added and the oldest message is removed
    expect(newState.message.length).toBe(100);
    expect(newState.message[99]).toEqual(newMessage);
  });

  test('should add message if the message list is less than 100', () => {
    const previousState = { ...initialState, message: Array(99).fill({ name: 'User', message: 'Test Message' }) };
    const newMessage = { name: 'New User', message: 'New Test Message' };

    // Dispatch setMessage action
    const newState = chatReducer(previousState, setMessage(newMessage));

    // Check if the new message is added
    expect(newState.message.length).toBe(100);
    expect(newState.message[99]).toEqual(newMessage);
  });
});
