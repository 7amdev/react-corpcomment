import ItemFeedback from "./ItemFeedback";
import { useFeedbackContext } from "../lib/hooks";

export default function Feedbacks() {
  const { feedbacks_filter_by_company, feedbacks_upvote } =
    useFeedbackContext("Feedbacks");
  return (
    <ol className="feedbacks">
      {feedbacks_filter_by_company.map(function (feedback) {
        return (
          <ItemFeedback
            key={feedback.id}
            feedback={feedback}
            on_upvote={feedbacks_upvote}
          />
        );
      })}
    </ol>
  );
}
