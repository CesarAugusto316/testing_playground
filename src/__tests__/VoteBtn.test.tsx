import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VoteBtn } from '../components';


describe('<VoteBtn/>', () => {
  const mockAltText = 'vote like';

  // beforeEach(() => {
  //   const mockHandleVote = vi.fn();
  //   render(
  //     <VoteBtn
  //       handleVote={mockHandleVote}
  //       altText={mockAltText}
  //       hasVoted={false}
  //       imgSrc={'../assets/apex461643588115.jpg'}
  //     />
  //   );

  //   // mockHandleVote.mockClear();
  // });

  it('should render an image and a button into the screen', () => {
    const mockHandleVote = vi.fn();
    render(
      <VoteBtn
        handleVote={mockHandleVote}
        altText={mockAltText}
        hasVoted={false}
        imgSrc={'../assets/apex461643588115.jpg'}
      />
    );

    const image = screen.getByRole('img', { name: mockAltText });
    const button = screen.getByRole('button', { name: mockAltText });

    expect(button).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it('should invoke handleVote Function when button is cliked', () => {
    const mockHandleVote = vi.fn(() => 0);
    const user = userEvent.setup();

    render(
      <VoteBtn
        handleVote={mockHandleVote}
        altText={mockAltText}
        hasVoted={false}
        imgSrc={'../assets/apex461643588115.jpg'}
      />
    );

    user.click(screen.getByRole('button', { name: mockAltText }));

    expect(mockHandleVote).toHaveBeenCalled();
    expect(mockHandleVote).toHaveBeenCalledTimes(1);
  });
});
