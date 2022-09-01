import { describe, expect, it, beforeAll, beforeEach, afterAll } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import user from '@testing-library/user-event';
import { SearchDrink } from '../components';
import { mockServer } from '../mocks/mockServer';
import { rest } from 'msw';


beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

beforeEach(() => {
  render(<SearchDrink />);
});

describe('<SearchDrink />', () => {
  it('should render a search box', () => {
    expect(screen
      .getByRole('searchbox')).toBeInTheDocument();
  });

  it('should render a button', () => {
    expect(screen
      .getByRole('button', { name: /search/i }))
      .toBeInTheDocument();
  });

  it('should render mock drink data', async () => {
    const searchInput = screen.getByRole('searchbox');
    const userEv = user.setup();

    act(() => {
      userEv.type(searchInput, 'vodka, {enter}');
    });

    (await screen.findAllByRole('img', { name: /test drink/i })).forEach(img => {
      expect(img).toBeInTheDocument();
    });

    (screen.getAllByRole('heading')).forEach(heading => {
      expect(heading).toBeInTheDocument();
    });

    (screen.getAllByText(/instructions test/i)).forEach(heading => {
      expect(heading).toBeInTheDocument();
    });
  });

  it('should render no drinks result', async () => {
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();

    const userEv = user.setup();
    const searchInput = screen.getByRole('searchbox');

    mockServer.use(rest
      .get(
        import.meta.env.VITE_DRINKS_API,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              drinks: null
            })
          );
        }
      ));

    act(() => {
      userEv.type(searchInput, 'beer, {enter}');
    });

    expect(await screen
      .findByRole('heading', { name: /no drinks available/i }))
      .toBeInTheDocument();
  });

  it('should render an error message', async () => {
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    const userEv = user.setup();
    const searchInput = screen.getByRole('searchbox');

    mockServer.use(rest
      .get(
        import.meta.env.VITE_DRINKS_API,
        (req, res, ctx) => {
          return res(
            ctx.status(503),
          );
        }
      )
    );

    act(() => {
      userEv.type(searchInput, 'beer, {enter}');
    });

    expect(await screen
      .findByRole('heading', { name: /service is not available/i }))
      .toBeInTheDocument();
  });

  it('should prevent empty string to be entered', () => {
    const searchInput = screen.getByRole('searchbox');
    const userEv = user.setup();

    act(() => {
      userEv.type(searchInput, '{enter}');
    });

    expect(screen.queryByRole('heading'))
      .not.toBeInTheDocument();

    expect(screen.queryByRole('img'))
      .not.toBeInTheDocument();
  });
});
