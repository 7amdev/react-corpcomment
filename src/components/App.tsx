import { useEffect, useState } from "react";
import Feedbacks, { Feedback } from "./Feedbacks";
import Footer from "./Footer";
import Hashtags from "./Hastags";
import Header from "./Header";
import { API_URL } from "../lib/constants";

export default function App() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

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
        <Header />
        <Feedbacks feedbacks={feedbacks} />
      </main>
      <Hashtags />
    </div>
  );
}
