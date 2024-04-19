import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Quiz } from "../../../../types";
import { updateQuiz } from "../../quizzesReducer";
import EditQuizDetails from "./EditQuizDetails";
import EditQuizQuestions from "./EditQuizQuestions";
import ToolBar from "./ToolBar";
import * as client from "../../client";

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

  const trimDate = (date: string) => {
    return date === null || date.length === 0 ? date : date.substring(0, 16);
  };

  const shouldTrimDates = () => {
    return (
      (editableQuiz.dueDate !== null && editableQuiz.dueDate.length > 16) ||
      (editableQuiz.availableDate !== null &&
        editableQuiz.availableDate.length > 16) ||
      (editableQuiz.availableUntilDate !== null &&
        editableQuiz.availableUntilDate.length > 16)
    );
  };

  useEffect(() => {
    let showCorrectAnswers = quiz.showCorrectAnswers;
    if (showCorrectAnswers && showCorrectAnswers !== "Immediately") {
      showCorrectAnswers = showCorrectAnswers?.substring(0, 16);
    }

    setEditableQuiz({
      ...quiz,
      dueDate: trimDate(quiz.dueDate),
      availableDate: trimDate(quiz.availableDate),
      availableUntilDate: trimDate(quiz.availableUntilDate),
      showCorrectAnswers,
    });
  }, [quiz]);

  useEffect(() => {
    if (shouldTrimDates()) {
      setEditableQuiz({
        ...editableQuiz,
        dueDate: trimDate(quiz.dueDate),
        availableDate: trimDate(quiz.availableDate),
        availableUntilDate: trimDate(quiz.availableUntilDate),
      });
    }
  }, [editableQuiz]);

  const onSave = (quiz: Quiz) => {
    let points = 0;
    quiz.questions.map(
      (question) => (points += parseInt(question.points) || 0),
    );
    const updatedQuiz = { ...quiz, points: points.toString() };
    client
      .updateQuiz(updatedQuiz)
      .then(() => dispatch(updateQuiz(updatedQuiz)));
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  };

  const disableSave = () => {
    return editableQuiz.title === "";
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
            onClick={() => onSave({ ...editableQuiz, published: true })}
            disabled={disableSave()}
          >
            Save {"&"} Publish
          </button>
          <button
            type="button"
            onClick={() => onSave(editableQuiz)}
            disabled={disableSave()}
          >
            Save
          </button>
        </div>
      </div>
      <hr id="footerLine2" />
    </>
  );
}

export default EditQuiz;
