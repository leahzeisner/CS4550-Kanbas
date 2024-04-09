import { FaEllipsisV } from "react-icons/fa";
import { Question as QuestionType } from "../../../../../types";

function Question({
  question,
  setIsEditing,
}: {
  question: QuestionType;
  setIsEditing: (b: boolean) => void;
}) {
  return (
    <li key={question._id} className="question">
      <div className="question-left">
        <div className="question-top">
          <span className="question-title">{question.title}</span>
          <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
          <span className="question-points">{question.points || "0"} pts</span>
        </div>

        <span className="quiz-question">{question.question}</span>
      </div>

      <div className="question-right">
        <button
          type="button"
          className="edit-question-button"
          onClick={() => setIsEditing(true)}
        >
          <FaEllipsisV />
        </button>
      </div>
    </li>
  );
}

export default Question;
