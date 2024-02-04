import Footer from "./Footer";
import Hashtags from "./Hastags";
import Header from "./Header";
import Feedbacks from "./Feedbacks";
import FeedbackProvider from "../contexts/context";

export default function App() {
  return (
    <div className="container">
      <Footer />
      <FeedbackProvider>
        <main>
          <Header />
          <Feedbacks />
        </main>
        <Hashtags />
      </FeedbackProvider>
    </div>
  );
}
