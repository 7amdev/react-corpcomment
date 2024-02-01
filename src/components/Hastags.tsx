type HashtagsProps = {
  companies: string[];
  setFilter: (text: string) => void;
  filter: string;
};

export default function Hashtags({
  companies,
  setFilter,
  filter,
}: HashtagsProps) {
  const on_click_handler = function (company: string) {
    if (filter === company) {
      setFilter("");
      return;
    }
    setFilter(company);
  };

  return (
    <ul className="hashtags">
      {companies.map(function (company) {
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
