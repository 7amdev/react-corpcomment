import { useContext } from "react";
import { FeedbackContext } from "../contexts/FeedbackContextProvider";
import Form from "./Form";

export default function Header() {
  const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error(
      "Check if component HEADER is a child of FeedbackContextProvider component"
    );
  }

  return (
    <header className="header">
      <img
        className="header__background"
        src="https://bytegrad.com/course-assets/js/1/pattern.svg"
        alt=""
      />
      <a href="/" className="logo">
        <img
          className="logo__img"
          src="https://bytegrad.com/course-assets/js/1/logo.svg"
          alt="logo image"
        />
      </a>
      <h1 className="title">
        Give Feedback. <span className="title__publicly">Publicly.</span>
      </h1>
      <Form />
    </header>
  );
}
