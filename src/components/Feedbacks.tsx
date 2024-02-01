import { Feedback } from "../lib/types";
import ItemFeedback from "./ItemFeedback";

type FeedbacksProps = {
  feedbacks: Feedback[];
  increase_upvote: (feedback: Feedback) => void;
};

export default function Feedbacks({
  feedbacks,
  increase_upvote,
}: FeedbacksProps) {
  return (
    <ol className="feedbacks">
      {feedbacks.map(function (feedback) {
        return (
          <ItemFeedback
            key={feedback.id}
            feedback={feedback}
            on_increase_upvote={increase_upvote}
          />
        );
      })}
    </ol>
  );
}
