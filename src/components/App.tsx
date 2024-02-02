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

  const feedbacks_filtered = filter
    ? feedbacks.filter(function (item) {
        return filter && item.company.toLowerCase() === filter.toLowerCase();
      })
    : feedbacks;

  const feedbacks_companies = feedbacks
    .map((item) => item.company)
    .filter(function (item, index, arr) {
      return arr.indexOf(item) === index;
    });

  const feedbacks_upvote = function (id: string): void {
    if (!id) return;

    const index = feedbacks.findIndex(function (item) {
      return item.id === id;
    });
    if (index === -1) return;

    fetch(`${API_URL}/feedbacks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ upvoteCount: feedbacks[index].upvoteCount + 1 }),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Response Error....");
        }
        return response.json();
      })
      .then(function () {
        feedbacks[index].upvoteCount += 1;

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

  return (
    <div className="container">
      <Footer />
      <main>
        <Header feedbacks_insert={feedbacks_insert} />
        <Feedbacks
          feedbacks={feedbacks_filtered}
          on_upvote={feedbacks_upvote}
        />
      </main>
      <Hashtags
        companies={feedbacks_companies}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
}
