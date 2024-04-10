import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Quiz } from "../../../../types";
import { updateQuiz } from "../../quizzesReducer";
import EditQuizDetails from "./EditQuizDetails";
import EditQuizQuestions from "./EditQuizQuestions";
import ToolBar from "./ToolBar";

function EditQuiz({
  quiz,
  setIsEditing,
}: {
  quiz: Quiz;
  setIsEditing: (b: boolean) => void;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const [editableQuiz, setEditableQuiz] = useState<Quiz>(quiz);
  const [isEditingDetails, setIsEditingDetails] = useState(true);
  const [notifyUsers, setNotifyUsers] = useState(false);

  useEffect(() => {
    let showCorrectAnswers = quiz.showCorrectAnswers;
    if (showCorrectAnswers && showCorrectAnswers !== "Immediately") {
      showCorrectAnswers = showCorrectAnswers?.substring(0, 16);
    }

    setEditableQuiz({
      ...quiz,
      dueDate: quiz.dueDate.substring(0, 16),
      availableDate: quiz.availableDate.substring(0, 16),
      availableUntilDate: quiz.availableUntilDate.substring(0, 16),
      showCorrectAnswers,
    });
  }, [quiz]);

  useEffect(() => {
    if (
      editableQuiz.dueDate.length > 16 ||
      editableQuiz.availableDate.length > 16 ||
      editableQuiz.availableUntilDate.length > 16
    ) {
      setEditableQuiz({
        ...editableQuiz,
        dueDate: quiz.dueDate.substring(0, 16),
        availableDate: quiz.availableDate.substring(0, 16),
        availableUntilDate: quiz.availableUntilDate.substring(0, 16),
      });
    }
  }, [editableQuiz]);

  const onSave = () => {
    let points = 0;
    editableQuiz.questions.map(
      (question) => (points += parseInt(question.points) || 0),
    );
    dispatch(updateQuiz({ ...editableQuiz, points: points.toString() }));
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  };

  return (
    <>
      <ToolBar quiz={editableQuiz} setIsEditing={setIsEditing} />

      <div className="details-questions-toggle">
        <button
          type="button"
          disabled={isEditingDetails}
          onClick={() => setIsEditingDetails(!isEditingDetails)}
        >
          Details
        </button>
        <button
          type="button"
          disabled={!isEditingDetails}
          onClick={() => setIsEditingDetails(!isEditingDetails)}
        >
          Questions
        </button>
        <span></span>
      </div>

      {isEditingDetails ? (
        <EditQuizDetails
          editableQuiz={editableQuiz}
          setEditableQuiz={setEditableQuiz}
        />
      ) : (
        <EditQuizQuestions
          editableQuiz={editableQuiz}
          setEditableQuiz={setEditableQuiz}
        />
      )}

      {/* Footer */}
      <hr id="footerLine1" />
      <div className="edit-details-footer">
        <div className="edit-details-footer-left">
          <input
            type="checkbox"
            value="NOTIFY-USERS"
            id="notifyUsers"
            checked={notifyUsers}
            onChange={(e) => setNotifyUsers(e.target.checked)}
          />
          <label htmlFor="notifyUsers" id="notifyUsersLabel">
            Notify users this quiz has changed
          </label>
        </div>
        <div className="edit-details-footer-right toolbar-buttons">
          <button
            type="button"
            onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes`)}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              setEditableQuiz({ ...editableQuiz, published: true });
              onSave();
            }}
          >
            Save {"&"} Publish
          </button>
          <button type="button" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
      <hr id="footerLine2" />
    </>
  );
}

export default EditQuiz;
