import Footer from "./Footer";
import Hashtags from "./Hastags";
import Header from "./Header";
import Feedbacks from "./Feedbacks";
import FeedbackContextProvider from "../contexts/FeedbackContextProvider";

export default function App() {
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
