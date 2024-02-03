export type Feedback = {
  id: string;
  badgeLetter: string;
  company: string;
  daysAgo: number;
  text: string;
  upvoteCount: number;
};

export type FeedbackPost = Omit<Feedback, "id">;
