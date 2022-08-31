import { describe, expect, it, beforeAll, beforeEach, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { SearchDrink } from '../components';
import { mockServer } from '../mocks/mockServer';

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

beforeEach(() => {
  render(<SearchDrink />);
});

describe('<SearchDrink />', () => {
  it('should render a search box', () => {
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('should render a button', () => {
    expect(screen.getByRole('button', { name: /search/i }))
      .toBeInTheDocument();
  });
});
