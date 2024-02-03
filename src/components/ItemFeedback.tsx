import { useState } from "react";
import { Feedback } from "../lib/types";
import { useFeedbackStore } from "../stores/feedbackStore";

type FeedbackProps = {
  feedback: Feedback;
};

export default function ItemFeedback({ feedback }: FeedbackProps) {
  const feedbacks_upvote = useFeedbackStore((state) => state.feedbacks_upvote);
  const [isDisabled, setIsDisabled] = useState(false);
  const [expand, setExpand] = useState(false);

  const on_upvote_handler = function (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation();
    feedbacks_upvote(feedback.id);
    setIsDisabled(true);
  };

  const on_item_click_handler = function (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) {
    setExpand(!expand);
  };

  return (
    <li
      key={feedback.id}
      className={`feedback ${expand && "feedback_expand"}`}
      onClick={on_item_click_handler}
    >
      <button
        className="feedback__button"
        onClick={on_upvote_handler}
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
      <p className="feedback__badge-letter">{feedback.badgeLetter}</p>
      <div className="feedback__info">
        <p className="feedback__company">{feedback.company}</p>
        <p className="feedback__message">{feedback.text}</p>
      </div>
      <p className="feedback__age">
        {feedback.daysAgo > 0 ? feedback.daysAgo + "d" : "NEW"}
      </p>
    </li>
  );
}
