import { FaBan, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Quiz } from "../../../../types";

function ToolBar({
  quiz,
  setIsEditing,
}: {
  quiz: Quiz;
  setIsEditing: (b: boolean) => void;
}) {
  return (
    <>
      <div className="quizzes-toolbar quiz-details-toolbar">
        <div className="toolbar-buttons">
          <button
            type="button"
            id="backBtn"
            onClick={() => setIsEditing(false)}
          >
            <FaArrowLeft />
          </button>
        </div>

        <div className="toolbar-buttons">
          <h5 className="toolbar-buttons-text">Points {quiz.points}</h5>
          <div className="toolbar-buttons-text">
            {quiz.published ? (
              <FaCheckCircle
                id="publish-quiz-btn-icon"
                style={{ color: "green" }}
              ></FaCheckCircle>
            ) : (
              <FaBan
                id="publish-quiz-btn-icon"
                style={{ color: "red" }}
              ></FaBan>
            )}
            <span>{quiz.published ? "Published" : "Not Published"}</span>
          </div>

          <button type="button" id="quiz-ellipsis-btn">
            <FaEllipsisV
              className="ms-2 ellipsis-v"
              id="quiz-ellipsis-btn-icon"
            />
          </button>
        </div>
      </div>

      <hr id="toolbar-footer-hr" />
    </>
  );
}

export default ToolBar;
