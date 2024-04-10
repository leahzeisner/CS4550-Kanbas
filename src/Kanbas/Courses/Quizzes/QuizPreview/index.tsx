import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaExclamationCircle,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { FaArrowRight, FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getEmptyQuiz } from "..";
import { KanbasState } from "../../../store";
import { Question, Quiz, Quizzes } from "../../../types";
import { formatDateTime } from "../../../utils";

type SelectedAnswerList = {
  questionId: string;
  selectedAnswerId: string | undefined;
}[];

function QuizPreview() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const quizzes: Quizzes = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes,
  );
  const [quiz, setQuiz] = useState<Quiz>(getEmptyQuiz(courseId || ""));
  const [date, setDate] = useState(new Date().toISOString());
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswerList, setSelectedAnswerList] =
    useState<SelectedAnswerList>([]);

  useEffect(() => {
    setDate(new Date().toISOString());
    const quiz = quizzes.find((q) => q._id === quizId);
    if (quiz) {
      setQuiz(quiz);

      const defaultSelectedAnswers: SelectedAnswerList = [];
      quiz.questions.forEach((q) => {
        defaultSelectedAnswers.push({
          questionId: q._id,
          selectedAnswerId: undefined,
        });
      });
      setSelectedAnswerList(defaultSelectedAnswers);
    }
  }, [quizId]);

  const updateQuestionIndex = (question: Question) => {
    const questionIndex = quiz.questions.findIndex(
      (q) => q._id === question._id,
    );
    if (questionIndex !== -1) {
      setQuestionIndex(questionIndex);
    }
  };

  const onAnswerChanged = (answerId: string) => {
    const updatedList = [...selectedAnswerList];
    updatedList[questionIndex] = {
      ...updatedList[questionIndex],
      selectedAnswerId: answerId,
    };
    setSelectedAnswerList(updatedList);
  };

  return (
    <div className="main-content">
      <div className="quiz-preview">
        <div className="quiz-preview-top">
          <h2 className="quiz-preview-top-text">{quiz.title}</h2>

          <div className="quiz-preview-warning">
            <FaExclamationCircle />
            <span id="quizPreviewWarningText">
              This is a preview of the published version of the quiz
            </span>
          </div>

          <p className="quiz-preview-top-text">
            Started: {formatDateTime(date)}
          </p>
          <h2 className="quiz-preview-top-text">Quiz Instructions</h2>
          <span>{quiz.description}</span>
          <hr />
        </div>

        {quiz.questions.length > 0 ? (
          <>
            <div className="quiz-preview-container">
              <div className="quiz-preview-item">
                <div className="quiz-preview-item-header">
                  <span>{quiz.questions[questionIndex].title}</span>
                  <span>{quiz.questions[questionIndex].points || "0"} pts</span>
                </div>

                <div className="quiz-preview-item-body">
                  <div className="quiz-preview-item-questions">
                    <span>{quiz.questions[questionIndex].question}</span>
                  </div>

                  <div className="quiz-preview-item-answers">
                    {quiz.questions[questionIndex].answers.map((a) => (
                      <div>
                        <hr id="quizPreviewAnswerHr" />
                        <input
                          type="radio"
                          name="quiz-preview-answer"
                          id={a._id}
                          value={a.answer}
                          checked={
                            selectedAnswerList[questionIndex]
                              .selectedAnswerId === a._id
                          }
                          onChange={() => onAnswerChanged(a._id)}
                        />
                        <label htmlFor={a._id}>{a.answer}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="toolbar-buttons next-btn-container">
                <button
                  type="button"
                  id="goBackBtn"
                  onClick={() => setQuestionIndex(questionIndex - 1)}
                  disabled={questionIndex === 0}
                >
                  <FaArrowLeft id="goBackBtnArrow" />
                  Back
                </button>
                <button
                  type="button"
                  id="nextBtn"
                  onClick={() => setQuestionIndex(questionIndex + 1)}
                  disabled={questionIndex === quiz.questions.length - 1}
                >
                  Next <FaArrowRight id="nextBtnArrow" />
                </button>
              </div>
            </div>

            <div className="quiz-preview-bottom-box toolbar-buttons">
              <span>
                Quiz saved at {formatDateTime(date).substring(date.length - 8)}
              </span>
              <button type="button" id="submitQuiz">
                Submit Quiz
              </button>
            </div>
          </>
        ) : (
          <span>There are currently no questions for this quiz</span>
        )}

        <div className="toolbar-buttons keep-editing">
          <button
            type="button"
            id="keepEditingBtn"
            onClick={() =>
              navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`)
            }
          >
            <FaPencil id="keepEditingBtnIcon" /> Keep editing this quiz
          </button>
        </div>

        {quiz.questions.length > 0 && (
          <div className="quiz-preview-questions-list">
            <h4>Questions</h4>
            {quiz.questions.map((q) => (
              <div className="questions-list">
                <FaRegQuestionCircle id="questionListIcon" />
                <span
                  onClick={() => updateQuestionIndex(q)}
                  style={{
                    fontWeight:
                      quiz.questions[questionIndex]._id === q._id
                        ? "bold"
                        : "normal",
                  }}
                >
                  {q.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPreview;
