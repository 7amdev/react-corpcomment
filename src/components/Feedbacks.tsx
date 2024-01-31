export type Feedback = {
  id: string;
  badgeLetter: string;
  company: string;
  daysAgo: number;
  text: string;
  upvoteCount: number;
};

type FeedbacksProps = {
  feedbacks: Feedback[];
};

export default function Feedbacks({ feedbacks }: FeedbacksProps) {
  return (
    <ol className="feedbacks">
      {feedbacks.map(function (feedback) {
        return (
          <li key={feedback.id} className="feedback">
            <button className="feedback__button">
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
      })}
    </ol>
  );
}
