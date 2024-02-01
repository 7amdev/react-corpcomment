import { Feedback } from "../lib/types";
import Form from "./Form";

type HeaderProps = {
  feedbacks_insert: (feedback: Feedback) => void;
};

export default function Header({ feedbacks_insert }: HeaderProps) {
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
      <Form feedbacks_insert={feedbacks_insert} />
    </header>
  );
}
