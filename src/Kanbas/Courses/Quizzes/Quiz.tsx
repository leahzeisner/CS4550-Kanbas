import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { FaBan, FaRocket } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Quiz as QuizType } from "../../types";
import { formatDateTime } from "../../utils";
import { updateQuiz } from "./quizzesReducer";

interface QuizProps {
  quiz: QuizType;
}

const getSpacer = () => <span>&nbsp; | &nbsp;</span>;

function Quiz({ quiz }: QuizProps) {
  const dispatch = useDispatch();

  const getAvailability = () => {
    const currentDate = new Date();
    const availableDate = new Date(quiz.availableDate);
    const availableUntilDate = new Date(quiz.availableUntilDate);

    let availability = "";
    let availableUntilText = "";
    if (currentDate < availableDate) {
      availability = "Not Available Until ";
      availableUntilText = formatDateTime(quiz.availableUntilDate);
    } else if (currentDate < availableUntilDate) {
      availability = "Available";
    } else {
      availability = "Closed";
    }

    return (
      <>
        <span className="quiz-info-bold">{availability}</span>
        <span>{availableUntilText}</span>
        {getSpacer()}
      </>
    );
  };

  const getQuizInfo = () => {
    return (
      <>
        {getAvailability()}
        <span className="quiz-info-bold">Due </span>
        <span>{formatDateTime(quiz.dueDate)}</span>
        {getSpacer()}
        <span>{quiz.points || "0"} pts</span>
        {getSpacer()}
        <span>{quiz.questions.length} Questions</span>
      </>
    );
  };

  const onPublishToggle = () => {
    dispatch(updateQuiz({ ...quiz, published: !quiz.published }));
  };

  const onQuizContextToggle = () => {
    // toggle quiz context menu
  };

  return (
    <li className="quiz-item" key={quiz._id}>
      <button type="button" className="quiz-btn">
        <FaRocket
          className={
            quiz.published
              ? "ms-2 ellipsis-v text-success"
              : "ms-2 ellipsis-v unpublish-quiz-btns"
          }
          onClick={onPublishToggle}
        ></FaRocket>
      </button>

      <div className="quiz-container quizzes-text-container">
        <div className="quiz-title">{quiz.title}</div>
        <div className="quiz-info">{getQuizInfo()}</div>
      </div>

      <div className="quiz-buttons">
        <button type="button" className="quiz-btn" onClick={onPublishToggle}>
          {quiz.published ? (
            <FaCheckCircle className="text-success check-circle" />
          ) : (
            <FaBan className="unpublish-quiz-btns" />
          )}
        </button>
        <button
          type="button"
          className="quiz-btn"
          onClick={onQuizContextToggle}
        >
          <FaEllipsisV className="ms-2" />
        </button>
      </div>
    </li>
  );
}

export default Quiz;
