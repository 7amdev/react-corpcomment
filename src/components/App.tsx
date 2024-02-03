import Footer from "./Footer";
import Hashtags from "./Hastags";
import Header from "./Header";
import Feedbacks from "./Feedbacks";
import FeedbackContextProvider from "../contexts/FeedbackContextProvider";
import { useFeedbackStore } from "../stores/feedbackStore";

export default function App() {
  const feedbacks_fetch = useFeedbackStore((state) => state.feedbacks_fetch);
  feedbacks_fetch();

  return (
    <div className="container">
      <Footer />
      <FeedbackContextProvider>
        <main>
          <Header />
          <Feedbacks />
        </main>
        <Hashtags />
      </FeedbackContextProvider>
    </div>
  );
}
