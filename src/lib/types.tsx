export type Feedback = {
  id: string;
  badgeLetter: string;
  company: string;
  daysAgo: number;
  text: string;
  upvoteCount: number;
};

export type FeedbackContextProps = {
  feedbacks: Feedback[];
  feedbacks_companies: string[];
  feedbacks_filter_by_company: Feedback[];
  filter: string;
  feedbacks_insert: (feedback: FeedbackPost) => Promise<void>;
  feedbacks_upvote: (id: string) => void;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

export type FeedbackPost = Omit<Feedback, "id">;
