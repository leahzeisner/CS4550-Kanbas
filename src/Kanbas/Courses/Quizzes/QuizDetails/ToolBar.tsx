import { FaBan, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { FaArrowLeft, FaPencil } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Quiz } from "../../../types";
import { updateQuiz } from "../quizzesReducer";
import * as client from "../client";

function ToolBar({
  quiz,
  setQuiz,
  setIsEditing,
}: {
  quiz: Quiz;
  setQuiz: (quiz: Quiz) => void;
  setIsEditing: (b: boolean) => void;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const onPublishToggle = () => {
    const updatedQuiz = { ...quiz, published: !quiz.published };
    setQuiz(updatedQuiz);
    client
      .updateQuiz(updatedQuiz)
      .then(() => dispatch(updateQuiz(updatedQuiz)));
  };

  return (
    <>
      <div className="quizzes-toolbar quiz-details-toolbar">
        <div className="toolbar-buttons">
          <button
            type="button"
            id="backBtn"
            onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes`)}
          >
            <FaArrowLeft />
          </button>
        </div>

        <div className="toolbar-buttons">
          <button
            type="button"
            id={quiz.published ? "unpublish-quiz-btn" : "publish-quiz-btn"}
            onClick={() => onPublishToggle()}
          >
            {quiz.published ? (
              <FaBan id="publish-quiz-btn-icon"></FaBan>
            ) : (
              <FaCheckCircle id="publish-quiz-btn-icon"></FaCheckCircle>
            )}
            {quiz.published ? "Unpublish" : "Publish"}
          </button>
          <button
            type="button"
            onClick={() =>
              navigate(
                `/Kanbas/Courses/${courseId}/Quizzes/Preview/${quiz._id}`,
              )
            }
          >
            Preview
          </button>
          <button type="button" onClick={() => setIsEditing(true)}>
            <FaPencil id="edit-quiz-btn-icon" /> Edit
          </button>
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
