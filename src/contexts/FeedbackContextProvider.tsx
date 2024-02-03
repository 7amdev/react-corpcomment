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
  feedbacks_upvote: (id: string) => void;
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

  const feedbacks_upvote = function (id: string): void {
    if (!id) return;
    const index = feedbacks.findIndex(function (item) {
      return item.id === id;
    });
    if (!index) return;

    fetch(`${API_URL}/feedbacks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ upvoteCount: feedbacks[index].upvoteCount + 1 }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Response Error....");
        }
        return response.json();
      })
      .then(function (data: Feedback) {
        feedbacks[index].upvoteCount = data.upvoteCount;

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
        feedbacks_upvote,
        filter,
        setFilter,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
