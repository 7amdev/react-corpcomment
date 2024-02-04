import { useFeedbackContext } from "../lib/hooks";

export default function Hashtags() {
  const { filter, setFilter, feedbacks_companies } =
    useFeedbackContext("Hashtags");

  const on_click_handler = function (company: string) {
    if (filter === company) {
      setFilter("");
      return;
    }
    setFilter(company);
  };

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
                filter === company ? "hashtag__button_active" : ""
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
