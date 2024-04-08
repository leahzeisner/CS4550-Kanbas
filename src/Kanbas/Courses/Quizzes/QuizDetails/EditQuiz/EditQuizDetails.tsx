import { useEffect, useState } from "react";
import { Quiz } from "../../../../types";

function EditQuizDetails({
  editableQuiz,
  setEditableQuiz,
}: {
  editableQuiz: Quiz;
  setEditableQuiz: (quiz: Quiz) => void;
}) {
  const [accessCodeChecked, setAccessCodeChecked] = useState(false);
  const [timeLimitChecked, setTimeLimitChecked] = useState(false);

  useEffect(() => {
    setAccessCodeChecked(editableQuiz.accessCode !== "");
    setTimeLimitChecked(editableQuiz.timeLimit !== "");
  }, [editableQuiz]);

  const showCorrectAnswersIsDateTime = () => {
    return (
      editableQuiz.showCorrectAnswers !== undefined &&
      editableQuiz.showCorrectAnswers !== "Immediately"
    );
  };

  return (
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

        {/* Access Code */}
        <div className="access-code">
          <div className="access-code-label">
            <input
              type="checkbox"
              value="ACCESS-CODE"
              id="accessCode"
              checked={accessCodeChecked}
              onChange={(e) => setAccessCodeChecked(e.target.checked)}
            />
            <label htmlFor="accessCode" id="accessCodeLabel">
              Access Code
            </label>

            {accessCodeChecked && (
              <input
                type="text"
                value={editableQuiz.accessCode}
                placeholder="Access Code"
                id="accessCodeInput"
                onChange={(e) =>
                  setEditableQuiz({
                    ...editableQuiz,
                    accessCode: e.target.value,
                  })
                }
              />
            )}
          </div>
        </div>

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
                <label htmlFor="timeLimitMinutes" id="timeLimitMinutesLabel">
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

        {/* Webcam */}
        <div className="webcam-required">
          <input
            type="checkbox"
            value="WEBCAM-REQUIRED"
            id="webcamRequired"
            checked={editableQuiz.webcamRequired}
            onChange={(e) =>
              setEditableQuiz({
                ...editableQuiz,
                webcamRequired: e.target.checked,
              })
            }
          />
          <label htmlFor="webcamRequired">Webcam Required</label>
        </div>

        {/* One Question at a Time */}
        <div className="one-q-at-a-time">
          <input
            type="checkbox"
            value="NUM-QUESTION-AT-A-TIME"
            id="numQuestionAtATime"
            checked={editableQuiz.oneQuestionAtATime}
            onChange={(e) =>
              setEditableQuiz({
                ...editableQuiz,
                oneQuestionAtATime: e.target.checked,
              })
            }
          />
          <label htmlFor="numQuestionAtATime">One Question at a Time</label>
        </div>

        {/* Lock Questions */}
        <div className="lock-questions">
          <input
            type="checkbox"
            value="LOCK-QUESTONS"
            id="lockQuestions"
            checked={editableQuiz.lockQuestionsAfterAnswering}
            onChange={(e) =>
              setEditableQuiz({
                ...editableQuiz,
                lockQuestionsAfterAnswering: e.target.checked,
              })
            }
          />
          <label htmlFor="lockQuestions">Lock Questions After Answering</label>
        </div>
      </div>

      {/* Due Date / Available Date / Available Until Date / Show Correct Answers */}
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

      {/* Show Correct Answers */}
      <div className="show-correct-answers">
        <label htmlFor="showCorrectAnswers">Show Correct Answers</label>

        <input
          type="radio"
          name="showcorrectanswers"
          id="never"
          checked={editableQuiz.showCorrectAnswers === undefined}
          onChange={(e) => {
            if (e.target.checked) {
              setEditableQuiz({
                ...editableQuiz,
                showCorrectAnswers: undefined,
              });
            }
          }}
        />
        <label htmlFor="never">Never</label>

        <input
          type="radio"
          name="showcorrectanswers"
          id="immediately"
          checked={editableQuiz.showCorrectAnswers === "Immediately"}
          onChange={(e) => {
            if (e.target.checked) {
              setEditableQuiz({
                ...editableQuiz,
                showCorrectAnswers: "Immediately",
              });
            }
          }}
        />
        <label htmlFor="immediately">Immediately</label>

        <input
          type="radio"
          name="showcorrectanswers"
          checked={showCorrectAnswersIsDateTime()}
          id="byDateTime"
          onChange={(e) => {
            if (e.target.checked) {
              setEditableQuiz({
                ...editableQuiz,
                showCorrectAnswers: "",
              });
            }
          }}
          onClick={() => console.log("onClick")}
        />
        <label htmlFor="by">By: </label>

        {showCorrectAnswersIsDateTime() && (
          <input
            id="showCorrectAnswersBy"
            type="datetime-local"
            value={editableQuiz.showCorrectAnswers?.substring(0, 16)}
            onChange={(e) =>
              setEditableQuiz({
                ...editableQuiz,
                showCorrectAnswers: e.target.value,
              })
            }
          />
        )}
      </div>
    </div>
  );
}

export default EditQuizDetails;
