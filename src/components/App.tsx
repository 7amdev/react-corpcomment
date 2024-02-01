import { useEffect, useState } from "react";
import Footer from "./Footer";
import Hashtags from "./Hastags";
import Header from "./Header";
import { API_URL } from "../lib/constants";
import { Feedback } from "../lib/types";
import Feedbacks from "./Feedbacks";

export default function App() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filter, setFilter] = useState("");

  const feedbacks_insert = function (feedback: Feedback) {
    setFeedbacks([...feedbacks, feedback]);
  };

  const feedbacks_get_companies = function (): string[] {
    return feedbacks.reduce(function (companies: string[], item: Feedback) {
      return companies.includes(item.company)
        ? companies
        : [...companies, item.company];
    }, []);
  };

  const feedbacks_increase_upvote_count = function (feedback: Feedback): void {
    if (!feedback) return;

    fetch(`${API_URL}/feedbacks/${feedback.id}`, {
      method: "PATCH",
      body: JSON.stringify({ upvoteCount: feedback.upvoteCount + 1 }),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Response Error....");
        }
        return response.json();
      })
      .then(function (data) {
        for (let i = 0; i < feedbacks.length; i++) {
          if (feedbacks[i].id !== data.id) continue;

          feedbacks[i].upvoteCount += 1;
          break;
        }

        setFeedbacks([...feedbacks]);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(function () {
    fetch(`${API_URL}/feedbacks`)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Response is not ok.");
        }
        return response.json();
      })
      .then(function (data: Feedback[]) {
        setFeedbacks(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const feedbacks_filtered = filter
    ? feedbacks.filter(function (item) {
        return filter && item.company.toLowerCase() === filter.toLowerCase();
      })
    : feedbacks;

  return (
    <div className="container">
      <Footer />
      <main>
        <Header feedbacks_insert={feedbacks_insert} />
        <Feedbacks
          feedbacks={feedbacks_filtered}
          increase_upvote={feedbacks_increase_upvote_count}
        />
      </main>
      <Hashtags
        companies={feedbacks_get_companies()}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
}
