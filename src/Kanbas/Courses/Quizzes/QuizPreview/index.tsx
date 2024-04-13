import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaExclamationCircle,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { FaArrowRight, FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getEmptyQuestion, getEmptyQuiz } from "..";
import { KanbasState } from "../../../store";
import { Question, QuestionType, Quiz, Quizzes } from "../../../types";
import { formatDateTime } from "../../../utils";

type SelectedAnswerList = {
  questionId: string;
  selectedAnswerId: string | undefined;
}[];

type FilledInBlanksAnswers = {
  answerId: string;
  value: string;
}[];

type FilledInBlanksAnswerList = {
  questionId: string;
  answers: FilledInBlanksAnswers;
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
  const [currentQuestion, setCurrentQuestion] =
    useState<Question>(getEmptyQuestion());
  const [selectedAnswerList, setSelectedAnswerList] =
    useState<SelectedAnswerList>([]);
  const [filledInBlanksAnswerList, setFilledInBlanksAnswerList] =
    useState<FilledInBlanksAnswerList>([]);

  useEffect(() => {
    setDate(new Date().toISOString());
    const quiz = quizzes.find((q) => q._id === quizId);
    if (quiz) {
      setQuiz(quiz);
      if (quiz.questions.length > 0) {
        setCurrentQuestion(quiz.questions[0]);
      }

      const defaultSelectedAnswers: SelectedAnswerList = [];
      quiz.questions.forEach((q) => {
        defaultSelectedAnswers.push({
          questionId: q._id,
          selectedAnswerId: undefined,
        });
      });
      setSelectedAnswerList(defaultSelectedAnswers);

      const defaultFilledInBlankAnswers: FilledInBlanksAnswerList = [];
      quiz.questions.forEach((q) => {
        const answers: FilledInBlanksAnswers = [];
        q.answers.forEach((a) => answers.push({ answerId: a._id, value: "" }));
        defaultFilledInBlankAnswers.push({
          questionId: q._id,
          answers,
        });
      });
      setFilledInBlanksAnswerList(defaultFilledInBlankAnswers);
    }
  }, [quizId]);

  const getQuizTypeLabel = () => {
    switch (currentQuestion.type) {
      case QuestionType.MULTIPLE_CHOICE:
        return " - Multiple Choice";
      case QuestionType.TRUE_FALSE:
        return " - True or False";
      case QuestionType.FILL_IN_BLANKS:
        return " - Fill in the Blanks";
    }
  };

  const updateQuestionIndex = (question: Question) => {
    const questionIndex = quiz.questions.findIndex(
      (q) => q._id === question._id,
    );
    if (questionIndex !== -1) {
      setQuestionIndex(questionIndex);
      setCurrentQuestion(quiz.questions[questionIndex]);
    }
  };

  const updateCurrentQuestion = (index: number) => {
    setQuestionIndex(index);
    setCurrentQuestion(quiz.questions[index]);
  };

  const onAnswerChanged = (answerId: string) => {
    const updatedList = [...selectedAnswerList];
    updatedList[questionIndex] = {
      ...updatedList[questionIndex],
      selectedAnswerId: answerId,
    };
    setSelectedAnswerList(updatedList);
  };

  const onBlankChange = (e: any, answerId: string) => {
    const value = e.target.value;
    const updatedList = filledInBlanksAnswerList.map((answer) =>
      answer.questionId === currentQuestion._id
        ? {
            ...answer,
            answers: answer.answers.map((a) =>
              a.answerId === answerId ? { ...a, value } : a,
            ),
          }
        : answer,
    );
    setFilledInBlanksAnswerList(updatedList);
  };

  const getBlankValue = (answerId: string) => {
    const questionAnswers = filledInBlanksAnswerList.find(
      (answer) => answer.questionId === currentQuestion._id,
    );
    if (!questionAnswers) return "";
    const answer = questionAnswers.answers.find((a) => a.answerId === answerId);
    return answer ? answer.value : "";
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
                  <div className="quiz-preview-item-header-left">
                    <span>{currentQuestion.title}</span>
                    <span>{getQuizTypeLabel()}</span>
                  </div>
                  <span>{currentQuestion.points || "0"} pts</span>
                </div>

                <div className="quiz-preview-item-body">
                  <div className="quiz-preview-item-questions">
                    <span>{currentQuestion.question}</span>
                  </div>

                  <div className="quiz-preview-item-answers">
                    {currentQuestion.answers.map((a, idx) => (
                      <div>
                        <hr id="quizPreviewAnswerHr" />
                        {currentQuestion.type ===
                        QuestionType.FILL_IN_BLANKS ? (
                          <>
                            <label htmlFor={a._id} id="fillInBlankAnswerLabel">
                              {idx + 1}.{" "}
                            </label>
                            <input
                              type="text"
                              name="quiz-preview-answer"
                              id={a._id}
                              value={getBlankValue(a._id)}
                              placeholder="Answer"
                              onChange={(e) => onBlankChange(e, a._id)}
                            />
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="toolbar-buttons next-btn-container">
                <button
                  type="button"
                  id="goBackBtn"
                  onClick={() => updateCurrentQuestion(questionIndex - 1)}
                  disabled={questionIndex === 0}
                >
                  <FaArrowLeft id="goBackBtnArrow" />
                  Back
                </button>
                <button
                  type="button"
                  id="nextBtn"
                  onClick={() => updateCurrentQuestion(questionIndex + 1)}
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
                      currentQuestion._id === q._id ? "bold" : "normal",
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
