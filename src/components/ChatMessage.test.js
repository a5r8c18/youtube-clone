import React from 'react';
import { render } from '@testing-library/react';
import ChatMessage from './ChatMessage';

// Define the test suite for the ChatMessage component
describe('ChatMessage Component', () => {
    // Mock data for the item prop
    const item = {
        name: 'John Doe',
        message: 'Hello, this is a test message.'
    };

    // Define the test case for rendering the component correctly
    test('renders correctly, displays user avatar, name, and message', () => {
        const { getByText, getByAltText } = render(<ChatMessage item={item} />);

        // Check if the user's name is rendered
        expect(getByText(item.name)).toBeInTheDocument();

        // Check if the user's message is rendered
        expect(getByText(item.message)).toBeInTheDocument();

        // Check if the user's avatar is rendered (using alt text or other unique properties)
        const avatar = getByAltText('John Doe');
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src', 'https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw');
    });
});

