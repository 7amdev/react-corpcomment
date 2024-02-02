import { useContext } from "react";
import ItemFeedback from "./ItemFeedback";
import { FeedbackContext } from "../contexts/FeedbackContextProvider";

export default function Feedbacks() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error(
      "Check if component FEEDBACKS is a child of FeedbackContextProvider component"
    );
  }

  return (
    <ol className="feedbacks">
      {context.feedbacks_filtered.map(function (feedback) {
        return (
          <ItemFeedback
            key={feedback.id}
            feedback={feedback}
            on_increase_upvote={context.feedbacks_increase_upvote_count}
          />
        );
      })}
    </ol>
  );
}
