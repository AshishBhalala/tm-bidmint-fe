// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { render } from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import App from './app';

it('renders without crashing', () => {
	const { getByText } = render(<App />);
	expect(getByText('Learn React')).toBeInTheDocument();
});

// More on writing component tests
// https://github.com/testing-library/react-testing-library
