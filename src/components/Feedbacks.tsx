import { useContext } from "react";
import ItemFeedback from "./ItemFeedback";
import { Context } from "../contexts/context";

export default function Feedbacks() {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "Check if component <Feedbacks> is a child of <FeedbackProvider> component"
    );
  }

  return (
    <ol className="feedbacks">
      {context.feedbacks_filter_by_company.map(function (feedback) {
        return (
          <ItemFeedback
            key={feedback.id}
            feedback={feedback}
            on_upvote={context.feedbacks_upvote}
          />
        );
      })}
    </ol>
  );
}
