import { useContext } from "react";
import { FeedbackContext } from "../contexts/FeedbackContextProvider";

export default function Hashtags() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error(
      "Check if component HASHTAGS is a child of FeedbackContextProvider component"
    );
  }

  const on_click_handler = function (company: string) {
    if (context.filter === company) {
      context.setFilter("");
      return;
    }
    context.setFilter(company);
  };

  return (
    <ul className="hashtags">
      {context.feedbacks_companies.map(function (company) {
        return (
          <li
            key={company}
            className="hashtag"
            onClick={() => on_click_handler(company)}
          >
            <button
              className={`hashtag__button ${
                context.filter === company ? "hashtag__button_active" : ""
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
