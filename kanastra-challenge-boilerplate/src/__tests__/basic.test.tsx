import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Layout } from '../components/ui/layout.tsx';

test('checks empty state when no file is selected', () => {
  render(<Layout />);
  const details = screen.queryByText('Upload');
  expect(details).not.toBeInTheDocument();
});

test('tests empty file assertion', () => {
  // const onFileChangeMock = jest.fn();
  render(<Layout />);

  const input = screen.getByPlaceholderText('Select a file');
  const fakeFile = new File([''], 'test.csv', { type: 'text/csv' });

  // Simulate file selection
  userEvent.upload(input, fakeFile);

  expect(screen.queryByText('empty')).toBeDefined();
});
