import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { KanbasState } from "../../store";
import { Quizzes as QuizzesList } from "../../types";
import Quiz from "./Quiz";
import { setQuizzes } from "./quizzesReducer";
import ToolBar from "./ToolBar";
import "./index.css";
import { getFreshId } from "../../utils";

export const getEmptyQuiz = (courseId: string) => {
  return {
    _id: getFreshId(),
    courseId,
    title: "Unnamed Quiz",
    description: "",
    dueDate: "",
    availableDate: "",
    availableUntilDate: "",
    points: "0",
    published: false,
    questions: [],
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: "20",
    multipleAttempts: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    showCorrectAnswers: "Immediately",
  };
};

function Quizzes() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const quizzes: QuizzesList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes,
  );
  const [showQuizzes, setShowQuizzes] = useState(true);
  const [searchQuizValue, setSearchQuizValue] = useState("");

  useEffect(() => {
    // UPDATE ONCE BACKEND IS FINISHED
    const courseQuizzes = quizzes.filter((q) => q.courseId === courseId);
    console.log(courseQuizzes);
    dispatch(setQuizzes(courseQuizzes));
  }, [courseId]);

  const getTitleArrow = () => {
    return showQuizzes ? (
      <FaArrowDown></FaArrowDown>
    ) : (
      <FaArrowRight></FaArrowRight>
    );
  };

  const getFilteredQuizzes = () => {
    return quizzes.filter(
      (quiz) =>
        quiz.courseId === courseId &&
        quiz.title.toLowerCase().includes(searchQuizValue.toLowerCase()),
    );
  };

  return (
    <div className="main-content">
      <div className="quizzes">
        <ToolBar setSearchQuizValue={setSearchQuizValue} />

        <ul className="list-group wd-quizzes">
          <li className="wd-quizzes-title">
            <button
              type="button"
              className="quiz-btn quiz-btn-arrow"
              onClick={() => setShowQuizzes(!showQuizzes)}
            >
              {getTitleArrow()}
            </button>

            <div className="quizzes-text-container">
              <span className="quizzes-text">Quizzes</span>
            </div>
          </li>

          {showQuizzes &&
            getFilteredQuizzes().map((quiz) => <Quiz quiz={quiz} />)}
        </ul>
      </div>
    </div>
  );
}

export default Quizzes;
