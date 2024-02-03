import { useFeedbackStore } from "../stores/feedbackStore";

export default function Hashtags() {
  const feedbacks_companies = useFeedbackStore(
    (state) => state.feedbacks_companies
  );
  const company_filter = useFeedbackStore((state) => state.company_filter);
  const company_filter_set = useFeedbackStore(
    (state) => state.company_filter_set
  );

  const on_click_handler = function (company: string) {
    if (company_filter === company) {
      company_filter_set("");
      return;
    }
    company_filter_set(company);
  };

  console.log("rendering hashtags...");

  return (
    <ul className="hashtags">
      {feedbacks_companies.map(function (company) {
        return (
          <li
            key={company}
            className="hashtag"
            onClick={() => on_click_handler(company)}
          >
            <button
              className={`hashtag__button ${
                company_filter === company ? "hashtag__button_active" : ""
              }`}
            >
              #{company}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
