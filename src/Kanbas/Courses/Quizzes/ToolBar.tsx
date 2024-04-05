import { FaEllipsisV, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getEmptyQuiz } from ".";
import "./index.css";
import { addQuiz } from "./quizzesReducer";

interface ToolBarProps {
  setSearchQuizValue: (value: string) => void;
}

function ToolBar({ setSearchQuizValue }: ToolBarProps) {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onToolbarAddQuiz = () => {
    // create new empty quiz
    const emptyQuiz = getEmptyQuiz(courseId || "");
    dispatch(addQuiz(emptyQuiz));
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${emptyQuiz._id}`);
  };
  return (
    <>
      <div className="quizzes-toolbar">
        <input
          type="text"
          placeholder="Search for Quiz"
          id="quiz-search"
          onChange={(e) => setSearchQuizValue(e.target.value.toLowerCase())}
        ></input>
        <div className="toolbar-buttons">
          <button
            type="button"
            id="add-quiz-btn"
            onClick={() => onToolbarAddQuiz()}
          >
            <FaPlus id="add-quiz-btn-icon"></FaPlus> Quiz
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
