import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getEmptyQuiz } from "..";
import { setPageList } from "../../../Dashboard/coursesReducer";
import { KanbasState } from "../../../store";
import { Quiz } from "../../../types";
import { formatDateTime } from "../../../utils";
import EditQuiz from "./EditQuiz/EditQuiz";
import ToolBar from "./ToolBar";

function QuizDetails() {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const quizzes = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes,
  );
  const [quiz, setQuiz] = useState<Quiz>(getEmptyQuiz(""));
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const quiz = quizzes.find((q) => q._id === quizId);
    if (quiz) {
      setQuiz(quiz);
      dispatch(setPageList(["Quizzes", quiz.title]));
    }
  }, [quizId, quizzes]);

  const getYesOrNo = (b: boolean) => (b ? "Yes" : "No");

  const getShowCorrectAnswers = () => {
    if (!quiz.showCorrectAnswers) {
      return "No";
    } else if (quiz.showCorrectAnswers === "Immediately") {
      return quiz.showCorrectAnswers;
    }
    const dateTime = formatDateTime(quiz.showCorrectAnswers);
    return "On " + dateTime;
  };

  return (
    <div className="main-content quiz-details">
      <div className="quiz-details-container">
        {isEditing ? (
          <EditQuiz quiz={quiz} setIsEditing={setIsEditing} />
        ) : (
          <>
            <ToolBar
              quiz={quiz}
              setQuiz={setQuiz}
              setIsEditing={setIsEditing}
            />

            <h1 id="quizDetailsTitle">{quiz.title}</h1>

            <div className="quiz-details-info">
              <div className="quiz-details-left">
                <span>Quiz Type</span>
                <span>Points</span>
                <span>Assignment Group</span>
                <span>Shuffle Answers</span>
                <span>Time Limit</span>
                <span>Multiple Attempts</span>
                <span>View Responses</span>
                <span>Show Correct Answers</span>
                <span>Access Code</span>
                <span>One Question at a Time</span>
                <span>Require Respondus LockDown Browser</span>
                <span>Required to View Quiz Results</span>
                <span>Webcam Required</span>
                <span>Lock Questions After Answering</span>
              </div>
              <div className="quiz-details-right">
                <span>{quiz.quizType}</span>
                <span>{quiz.points}</span>
                <span>{quiz.assignmentGroup.toUpperCase()}</span>
                <span>{getYesOrNo(quiz.shuffleAnswers)}</span>
                <span>
                  {quiz.timeLimit ? quiz.timeLimit + " Minutes" : "No"}
                </span>
                <span>{getYesOrNo(quiz.multipleAttempts)}</span>
                <span>Always</span>
                <span>{getShowCorrectAnswers()}</span>
                <span>{quiz.accessCode === "" ? "No" : quiz.accessCode}</span>
                <span>{getYesOrNo(quiz.oneQuestionAtATime)}</span>
                <span>No</span>
                <span>No</span>
                <span>{getYesOrNo(quiz.webcamRequired)}</span>
                <span>{getYesOrNo(quiz.lockQuestionsAfterAnswering)}</span>
              </div>
            </div>

            <div className="quiz-details-footer">
              <div className="quiz-details-footer-headers">
                <span>Due</span>
                <span id="quizFor">For</span>
                <span>Available from</span>
                <span>Until</span>
              </div>
              <hr />
              <div className="quiz-details-footer-info">
                <span>{formatDateTime(quiz.dueDate)}</span>
                <span id="quizFor">Everyone</span>
                <span>{formatDateTime(quiz.availableDate)}</span>
                <span>{formatDateTime(quiz.availableUntilDate)}</span>
              </div>
              <hr />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default QuizDetails;
