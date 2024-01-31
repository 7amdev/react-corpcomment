export default function Header() {
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
      <form className="feedback-form feedback-form_invalid " action="#">
        <textarea
          id="feedback-input"
          className="feedback-form__textarea"
          spellCheck="false"
          placeholder="."
        />
        <label htmlFor="feedback-input" className="feedback-form__placeholder">
          Enter your feedback here, remenber to #hashtag the company
        </label>
        <span className="feedback-form__count">150</span>
        <button className="feedback-form__submit">Submit</button>
      </form>
    </header>
  );
}
