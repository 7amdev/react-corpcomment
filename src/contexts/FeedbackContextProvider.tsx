import { createContext, useEffect, useState } from "react";
import { Feedback } from "../lib/types";
import { API_URL } from "../lib/constants";

type FeedbackContextProviderProps = {
  children: React.ReactNode;
};

type FeedbackProviderValue = {
  feedbacks_filtered: Feedback[];
  feedbacks_companies: string[];
  feedbacks_insert: (feedback: Feedback) => void;
  feedbacks_increase_upvote_count: (feedback: Feedback) => void;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

export const FeedbackContext = createContext<FeedbackProviderValue | null>(
  null
);

export default function FeedbackContextProvider({
  children,
}: FeedbackContextProviderProps): React.ReactNode {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filter, setFilter] = useState("");

  const feedbacks_filtered: Feedback[] = filter
    ? feedbacks.filter(function (item) {
        return filter && item.company.toLowerCase() === filter.toLowerCase();
      })
    : feedbacks;

  const feedbacks_companies = feedbacks
    .map((item) => item.company)
    .filter(function (item: string, index: number, array: string[]) {
      return array.indexOf(item) === index;
    });

  const feedbacks_insert = function (feedback: Feedback): void {
    setFeedbacks([...feedbacks, feedback]);
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

  return (
    <FeedbackContext.Provider
      value={{
        feedbacks_companies,
        feedbacks_filtered,
        feedbacks_insert,
        feedbacks_increase_upvote_count,
        filter,
        setFilter,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
