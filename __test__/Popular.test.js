import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Popular from '../Popular';
import { GlobalContextProvider } from '../context';

test('renders loading skeleton when loading', () => {
  render(
    <GlobalContextProvider value={{ loading: true }}>
      <Popular />
    </GlobalContextProvider>
  );

  const skeleton = screen.getByTestId('skeleton');
  expect(skeleton).toBeInTheDocument();
});