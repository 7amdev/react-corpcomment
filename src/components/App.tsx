export default function App() {
  return (
    <div className="container">
      <footer className="footer">
        &copy; Copyrights reserved to Alfredom.
      </footer>
      <main>
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
            <label
              htmlFor="feedback-input"
              className="feedback-form__placeholder"
            >
              Enter your feedback here, remenber to #hashtag the company
            </label>
            <span className="feedback-form__count">150</span>
            <button className="feedback-form__submit">Submit</button>
          </form>
        </header>
        <ol className="feedbacks">
          <li className="feedback">
            <button className="feedback__button">
              <i className="feedback__icon">^</i>
              593
            </button>
            <p className="feedback__badge-letter">B</p>
            <div className="feedback__info">
              <p className="feedback__company">Starbucks</p>
              <p className="feedback__message">
                I really wish #starbucks would use wrappers for hot drinks as a
                standard, I keep burning my hands and am tired of bothering the
                employees for wrappers.
              </p>
            </div>
            <p className="feedback__age">4d</p>
          </li>
          <li className="feedback">
            <button className="feedback__button">
              <i className="feedback__icon">^</i>
              298
            </button>
            <p className="feedback__badge-letter">B</p>
            <div className="feedback__info">
              <p className="feedback__company">McDonald's</p>
              <p className="feedback__message">
                I really wish #starbucks would use wrappers for hot drinks as a
                standard, I keep burning my hands and am tired of bothering the
                employees for wrappers.
              </p>
            </div>
            <p className="feedback__age">2d</p>
          </li>
        </ol>
      </main>
      <ul className="hashtags">
        <li className="hashtag">
          <button className="hashtag__button">#Netflix</button>
        </li>
        <li>
          <button className="hashtag__button">#Starbucks</button>
        </li>
        <li>
          <button className="hashtag__button">#McDonald's</button>
        </li>
      </ul>
    </div>
  );
}
