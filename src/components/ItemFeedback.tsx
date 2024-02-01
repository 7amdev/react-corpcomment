import { useState } from "react";
import { Feedback } from "../lib/types";

type FeedbackProps = {
  feedback: Feedback;
  on_increase_upvote: (feedback: Feedback) => void;
};

export default function ItemFeedback({
  feedback,
  on_increase_upvote,
}: FeedbackProps) {
  const [isDisabled, setIsDisabled] = useState(false);

  const on_click_hanlder = function (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    on_increase_upvote(feedback);
    setIsDisabled(true);
  };

  return (
    <li key={feedback.id} className="feedback">
      <button
        className="feedback__button"
        onClick={on_click_hanlder}
        disabled={isDisabled}
      >
        <svg
          className="feedback__icon"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path>
        </svg>
        {feedback.upvoteCount}
      </button>
      <p className="feedback__badge-letter">B</p>
      <div className="feedback__info">
        <p className="feedback__company">{feedback.company}</p>
        <p className="feedback__message">{feedback.text}</p>
      </div>
      <p className="feedback__age">{`${feedback.daysAgo}d`}</p>
    </li>
  );
}
