import { FC, MouseEventHandler } from 'react';


interface VoteBtnProps {
  handleVote: MouseEventHandler,
  hasVoted: boolean,
  imgSrc: string,
  altText: string
}

export const VoteBtn: FC<VoteBtnProps> = ({ altText, handleVote, hasVoted, imgSrc }) => {
  return (
    <button onClick={handleVote} disabled={hasVoted}>
      <img src={imgSrc} alt={altText} />
    </button>
  );
};
