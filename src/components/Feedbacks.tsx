import { Feedback } from "../lib/types";
import ItemFeedback from "./ItemFeedback";

type FeedbacksProps = {
  feedbacks: Feedback[];
  on_upvote: (id: string) => void;
};

export default function Feedbacks({ feedbacks, on_upvote }: FeedbacksProps) {
  return (
    <ol className="feedbacks">
      {feedbacks.map(function (feedback) {
        return (
          <ItemFeedback
            key={feedback.id}
            feedback={feedback}
            on_upvote={on_upvote}
          />
        );
      })}
    </ol>
  );
}
