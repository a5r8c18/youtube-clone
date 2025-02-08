import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Body from './Body';


// Mocking the Sidebar and Outlet components
jest.mock('./Sidebar', () => () => <div>Sidebar</div>);
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Outlet: () => <div>Outlet</div>
}));

describe('Body Component', () => {
    test('renders Sidebar component', () => {
        const { getByText } = render(
            <BrowserRouter>
                <Body />
            </BrowserRouter>
        );
        expect(getByText('Sidebar')).toBeInTheDocument();
    });

    test('renders Outlet component', () => {
        const { getByText } = render(
            <BrowserRouter>
                <Body />
            </BrowserRouter>
        );
        expect(getByText('Outlet')).toBeInTheDocument();
    });

    test('applies the correct styles', () => {
        const { container } = render(
            <BrowserRouter>
                <Body />
            </BrowserRouter>
        );
        expect(container.firstChild).toHaveClass('flex mt-16 bg-white dark:bg-gray-800');
    });
});
