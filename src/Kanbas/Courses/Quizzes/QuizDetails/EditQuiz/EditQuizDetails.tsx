import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Quiz } from "../../../../types";
import { updateQuiz } from "../../quizzesReducer";
import EditQuizQuestions from "./EditQuizQuestions";
import ToolBar from "./ToolBar";

function EditQuizDetails({
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
  const [timeLimitChecked, setTimeLimitChecked] = useState(false);
  const [notifyUsers, setNotifyUsers] = useState(false);

  useEffect(() => {
    setEditableQuiz({
      ...quiz,
      dueDate: quiz.dueDate.substring(0, 16),
      availableDate: quiz.availableDate.substring(0, 16),
      availableUntilDate: quiz.availableUntilDate.substring(0, 16),
    });
    if (quiz.timeLimit) {
      setTimeLimitChecked(true);
    }
  }, [quiz]);

  const onSave = (quiz: Quiz) => {
    dispatch(updateQuiz(quiz));
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  };

  return (
    <>
      <ToolBar quiz={quiz} setIsEditing={setIsEditing} />

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
        <div className="edit-details">
          {/* Title */}
          <input
            id="editQuizDetailTitle"
            type="text"
            value={editableQuiz.title}
            placeholder="Quiz Title"
            onChange={(e) =>
              setEditableQuiz({ ...editableQuiz, title: e.target.value })
            }
          ></input>

          {/* Description */}
          <span className="quiz-info-bold">Quiz Instructions:</span>
          <textarea
            cols={50}
            rows={5}
            placeholder="Quiz Description"
            onChange={(e) =>
              setEditableQuiz({ ...editableQuiz, description: e.target.value })
            }
          >
            {editableQuiz.description}
          </textarea>

          {/* Assignment */}
          <div>
            <div className="quiz-type">
              <div>
                <label htmlFor="quizType">Quiz Type</label>
              </div>

              <select
                id="quizType"
                value={editableQuiz.quizType}
                onChange={(e) =>
                  setEditableQuiz({ ...editableQuiz, quizType: e.target.value })
                }
              >
                <option id="GRADED-QUIZ">Graded Quiz</option>
                <option id="PRACTICE-QUIZ">Practice Quiz</option>
                <option id="GRADED-SURVEY">Graded Survey</option>
                <option id="UNGRADED-SURVEY">Ungraded Survey</option>
              </select>
            </div>

            <div className="assignment-group">
              <div>
                <label htmlFor="assignmentGroup">Assignment Group</label>
              </div>

              <select
                id="assignmentGroup"
                value={editableQuiz.assignmentGroup}
                onChange={(e) =>
                  setEditableQuiz({
                    ...editableQuiz,
                    assignmentGroup: e.target.value,
                  })
                }
              >
                <option id="QUIZZES">Quizzes</option>
                <option id="EXAMS">Exams</option>
                <option id="ASSIGNMENTS">Assignments</option>
                <option id="PROJECTS">Projects</option>
              </select>
            </div>

            <div className="assign-to">
              <div>
                <label htmlFor="assignTo">Assign To</label>
              </div>

              <select
                id="assignTo"
                value={editableQuiz.assignmentGroup}
                onChange={(e) =>
                  setEditableQuiz({
                    ...editableQuiz,
                    assignmentGroup: e.target.value,
                  })
                }
              >
                <option id="EVERYONE">Everyone</option>
              </select>
            </div>
          </div>

          {/* More Options */}
          <div className="edit-quiz-options">
            <span>Options</span>

            {/* Time Limit */}
            <div className="time-limit">
              <div className="time-limit-label">
                <input
                  type="checkbox"
                  value="TIME-LIMIT"
                  id="timeLimit"
                  checked={timeLimitChecked}
                  onChange={(e) => setTimeLimitChecked(e.target.checked)}
                />
                <label htmlFor="timeLimit" id="timeLimitLabel">
                  Time Limit
                </label>

                {timeLimitChecked && (
                  <div className="time-limit-input">
                    <input
                      type="number"
                      value={editableQuiz.timeLimit}
                      id="timeLimitMinutes"
                      onChange={(e) =>
                        setEditableQuiz({
                          ...editableQuiz,
                          timeLimit: e.target.value,
                        })
                      }
                    />
                    <label
                      htmlFor="timeLimitMinutes"
                      id="timeLimitMinutesLabel"
                    >
                      Minutes
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Shuffle Answers */}
            <div className="shuffle-answers">
              <input
                type="checkbox"
                value="SHUFFLE-ANSWERS"
                id="shuffleAnswers"
                checked={editableQuiz.shuffleAnswers}
                onChange={(e) =>
                  setEditableQuiz({
                    ...editableQuiz,
                    shuffleAnswers: e.target.checked,
                  })
                }
              />
              <label htmlFor="shuffleAnswers">Shuffle Answers</label>
            </div>

            {/* Allow Multiple Attempts */}
            <div className="multiple-attempts">
              <input
                type="checkbox"
                value="MULTIPLE-ATTEMPTS"
                id="multipleAttempts"
                checked={editableQuiz.multipleAttempts}
                onChange={(e) =>
                  setEditableQuiz({
                    ...editableQuiz,
                    multipleAttempts: e.target.checked,
                  })
                }
              />
              <label htmlFor="multipleAttempts">Allow Multiple Attempts</label>
            </div>
          </div>

          {/* Due Date / Available Date / Available Until Date */}
          <div className="due-dates">
            <div className="due-date">
              <label htmlFor="due">Due</label>
              <input
                id="due"
                type="datetime-local"
                value={editableQuiz.dueDate}
                onChange={(e) =>
                  setEditableQuiz({
                    ...editableQuiz,
                    dueDate: e.target.value,
                  })
                }
              />
            </div>

            <div className="available-date">
              <label htmlFor="available">Available from</label>
              <input
                id="available"
                type="datetime-local"
                value={editableQuiz.availableDate}
                onChange={(e) =>
                  setEditableQuiz({
                    ...editableQuiz,
                    availableDate: e.target.value,
                  })
                }
              />
            </div>

            <div className="available-until-date">
              <label htmlFor="available-until">Available until</label>
              <input
                id="available-until"
                type="datetime-local"
                value={editableQuiz.availableUntilDate}
                onChange={(e) =>
                  setEditableQuiz({
                    ...editableQuiz,
                    availableUntilDate: e.target.value,
                  })
                }
              />
            </div>
          </div>

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
              >
                Save {"&"} Publish
              </button>
              <button type="button" onClick={() => onSave(editableQuiz)}>
                Save
              </button>
            </div>
          </div>
          <hr id="footerLine2" />
        </div>
      ) : (
        <EditQuizQuestions />
      )}
    </>
  );
}

export default EditQuizDetails;
