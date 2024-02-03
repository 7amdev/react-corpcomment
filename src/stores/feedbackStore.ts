import { create } from "zustand";
import { Feedback, FeedbackPost } from "../lib/types";
import { API_URL } from "../lib/constants";

type FeedbackStore = {
  feedbacks: Feedback[];
  feedbacks_companies: string[];
  feedbacks_fetch: () => void;
  feedbacks_insert: (feedback: FeedbackPost) => void;
  feedbacks_upvote: (id: string) => void;
  feedbacks_filter_by_company: () => Feedback[];
  company_filter: string;
  company_filter_set: (value: string) => void;
};

export const useFeedbackStore = create<FeedbackStore>()(function (set, get) {
  return {
    feedbacks: [],
    company_filter: "",
    feedbacks_companies: [],
    feedbacks_fetch: function () {
      fetch(`${API_URL}/feedbacks`)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Response is not ok.");
          }
          return response.json();
        })
        .then(function (data: Feedback[]) {
          const companies = data
            .map((item: Feedback) => item.company)
            .filter(function (item: string, index: number, array: string[]) {
              return array.indexOf(item) === index;
            });

          return set(function (state) {
            state.company_filter_set("");

            return {
              feedbacks: data,
              feedbacks_companies: companies,
            };
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    },

    feedbacks_insert: async function (feedback: FeedbackPost) {
      const response = await fetch(`${API_URL}/feedbacks`, {
        method: "POST",
        body: JSON.stringify(feedback),
      });
      const data: Feedback = await response.json();
      return set(function (state) {
        const feedbacks_updated = [...state.feedbacks, data];
        const companies_updated = feedbacks_updated
          .map((item: Feedback) => item.company)
          .filter(function (item: string, index: number, array: string[]) {
            return array.indexOf(item) === index;
          });

        return {
          feedbacks: feedbacks_updated,
          feedbacks_companies: companies_updated,
        };
      });
    },
    feedbacks_upvote: function (id: string) {
      if (!id) return;
      const index = get().feedbacks.findIndex(function (item) {
        return item.id === id;
      });
      if (!index) return;

      fetch(`${API_URL}/feedbacks/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          upvoteCount: get().feedbacks[index].upvoteCount + 1,
        }),
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
          return set(function (state) {
            state.feedbacks[index].upvoteCount = data.upvoteCount;

            return {
              feedbacks: [...state.feedbacks],
            };
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    feedbacks_filter_by_company: function () {
      return get().company_filter
        ? get().feedbacks.filter(function (item) {
            return (
              item.company.toLowerCase() === get().company_filter.toLowerCase()
            );
          })
        : get().feedbacks;
    },
    company_filter_set: function (value: string) {
      return set(function (state) {
        return {
          company_filter: value,
        };
      });
    },
  };
});
