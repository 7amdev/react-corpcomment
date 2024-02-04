import { createContext, useEffect, useMemo, useState } from "react";
import { ContextProps, Feedback, FeedbackPost } from "../lib/types";
import { API_URL } from "../lib/constants";

export const Context = createContext<ContextProps | null>(null);

const FeedbackProvider: React.FC<{ children: React.ReactNode }> = function ({
  children,
}) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filter, setFilter] = useState("");

  const feedbacks_filter_by_company: Feedback[] = filter
    ? feedbacks.filter(function (item) {
        return filter && item.company.toLowerCase() === filter.toLowerCase();
      })
    : feedbacks;

  const feedbacks_companies = useMemo(
    () =>
      feedbacks
        .map((item) => item.company)
        .filter(function (item: string, index: number, array: string[]) {
          return array.indexOf(item) === index;
        }),
    [feedbacks]
  );

  const feedbacks_insert = async function (
    feedback: FeedbackPost
  ): Promise<void> {
    const response = await fetch(`${API_URL}/feedbacks`, {
      method: "POST",
      body: JSON.stringify(feedback),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Fetch response error");
    }

    const data: Feedback = await response.json();
    setFeedbacks([...feedbacks, data]);
  };

  const feedbacks_upvote = function (id: string): void {
    if (!id) return;

    const index = feedbacks.findIndex(function (item) {
      return item.id === id;
    });
    if (index === -1) return;

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
    <Context.Provider
      value={{
        feedbacks,
        feedbacks_companies,
        feedbacks_filter_by_company,
        filter,
        feedbacks_insert,
        feedbacks_upvote,
        setFilter,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default FeedbackProvider;
