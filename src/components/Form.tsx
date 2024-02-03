import { useContext, useRef, useState } from "react";
import { API_URL } from "../lib/constants";
import { Feedback, FeedbackPost } from "../lib/types";
import { FeedbackContext } from "../contexts/FeedbackContextProvider";

const MAX_CHARACTERS = 150;

export default function Form() {
  const [message, setMessage] = useState("");
  const [invalidForm, setInvalidForm] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const errorInterval = useRef(-1);
  const successInterval = useRef(-1);
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error(
      "Check if component FORM is a child of FeedbackContextProvider component"
    );
  }

  const character_count = MAX_CHARACTERS - message.length;

  const on_submit_handler = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const company_name = message
      .split(" ")
      .find(function (word) {
        return word.includes("#");
      })
      ?.slice(1);

    if (!company_name || company_name.length < 5) {
      clearInterval(errorInterval.current);

      setInvalidForm(true);
      errorInterval.current = setInterval(function () {
        setInvalidForm(false);
      }, 2000);

      console.warn("Company name is undefined or too small (<5 characters)");

      return;
    }

    const feedback_new: FeedbackPost = {
      company: company_name,
      badgeLetter: company_name.charAt(0).toUpperCase(),
      upvoteCount: 0,
      daysAgo: 0,
      text: message,
    };

    try {
      context.feedbacks_insert(feedback_new);
    } catch (error) {
      console.error(error);
      setInvalidForm(true);
      errorInterval.current = setInterval(function () {
        setInvalidForm(false);
      }, 2000);

      return;
    }

    setMessage("");

    clearInterval(successInterval.current);
    successInterval.current = setInterval(function () {
      setValidForm(false);
    }, 2000);
    setValidForm(true);
  };

  const on_message_handler = function (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const msg = e.target.value;
    if (msg.length > MAX_CHARACTERS) return;

    setMessage(msg);
  };

  return (
    <form
      className={`feedback-form ${validForm && "feedback-form_valid"} ${
        invalidForm && "feedback-form_invalid"
      }`}
      onSubmit={on_submit_handler}
    >
      <textarea
        id="feedback-input"
        className="feedback-form__textarea"
        spellCheck="false"
        placeholder="."
        value={message}
        onChange={on_message_handler}
      />
      <label htmlFor="feedback-input" className="feedback-form__placeholder">
        Enter your feedback here, remenber to #hashtag the company
      </label>
      <span className="feedback-form__count">{character_count}</span>
      <button className="feedback-form__submit">Submit</button>
    </form>
  );
}
