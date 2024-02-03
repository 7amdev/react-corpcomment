import ItemFeedback from "./ItemFeedback";
import { useFeedbackStore } from "../stores/feedbackStore";
import { Feedback } from "../lib/types";

export default function Feedbacks() {
  const feedbacks: Feedback[] = useFeedbackStore((state) => state.feedbacks);
  const company_filter: string = useFeedbackStore(
    (state) => state.company_filter
  );

  const feedbacks_filtered = company_filter
    ? feedbacks.filter(function (item: Feedback) {
        return item.company.toLowerCase() === company_filter.toLowerCase();
      })
    : feedbacks;

  return (
    <ol className="feedbacks">
      {feedbacks_filtered.map(function (feedback) {
        return <ItemFeedback key={feedback.id} feedback={feedback} />;
      })}
    </ol>
  );
}
