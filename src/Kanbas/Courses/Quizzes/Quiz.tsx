import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { FaBan, FaRocket } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Quiz as QuizType } from "../../types";
import { formatDateTime } from "../../utils";
import { deleteQuiz, updateQuiz } from "./quizzesReducer";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";

interface QuizProps {
  quiz: QuizType;
}

const getSpacer = () => <span>&nbsp; | &nbsp;</span>;

function Quiz({ quiz }: QuizProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });

  const getAvailability = () => {
    const currentDate = new Date();
    const availableDate = new Date(quiz.availableDate);
    const availableUntilDate = new Date(quiz.availableUntilDate);

    let availability = "";
    let availableUntilText = "";
    if (currentDate < availableDate) {
      availability = "Not Available Until ";
      availableUntilText = formatDateTime(quiz.availableUntilDate);
    } else if (currentDate < availableUntilDate) {
      availability = "Available";
    } else {
      availability = "Closed";
    }

    return (
      <>
        <span className="quiz-info-bold">{availability}</span>
        <span>{availableUntilText}</span>
        {getSpacer()}
      </>
    );
  };

  const getQuizInfo = () => {
    return (
      <>
        {/* Availability */}
        {getAvailability()}
        {/* Due Date */}
        <span className="quiz-info-bold">Due </span>
        <span>{formatDateTime(quiz.dueDate)}</span>
        {/* Points and Questions if published */}
        {quiz.published && (
          <>
            {getSpacer()}
            <span>{quiz.points || "0"} pts</span>
            {getSpacer()}
            <span>{quiz.questions.length} Questions</span>
          </>
        )}
      </>
    );
  };

  const onPublishToggle = () => {
    dispatch(updateQuiz({ ...quiz, published: !quiz.published }));
  };

  const getQuizDetailsPath = () => {
    return `/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`;
  };

  const onDeleteQuiz = () => {
    dispatch(deleteQuiz(quiz));
    popupState.close();
  };

  return (
    <li className="quiz-item" key={quiz._id}>
      <button type="button" className="quiz-btn">
        <FaRocket
          className={
            quiz.published
              ? "ms-2 ellipsis-v text-success"
              : "ms-2 ellipsis-v unpublish-quiz-btns"
          }
          onClick={onPublishToggle}
        ></FaRocket>
      </button>

      <div className="quiz-container quizzes-text-container">
        <div className="quiz-title">
          <Link id="quiz-title-link" to={getQuizDetailsPath()}>
            {quiz.title}
          </Link>
        </div>
        <div className="quiz-info">{getQuizInfo()}</div>
      </div>

      <div className="quiz-buttons">
        <button type="button" className="quiz-btn" onClick={onPublishToggle}>
          {quiz.published ? (
            <FaCheckCircle className="text-success check-circle" />
          ) : (
            <FaBan className="unpublish-quiz-btns" />
          )}
        </button>
        <Button type="button" variant="contained" {...bindTrigger(popupState)}>
          <FaEllipsisV className="ms-2" />
        </Button>
        <Menu {...bindMenu(popupState)}>
          <MenuItem onClick={() => navigate(getQuizDetailsPath())}>
            Edit
          </MenuItem>
          <MenuItem onClick={onDeleteQuiz}>Delete</MenuItem>
          <MenuItem onClick={onPublishToggle}>Publish</MenuItem>
          {/* Optional */}
          {/* <MenuItem onClick={popupState.close}>Copy</MenuItem>
          <MenuItem onClick={popupState.close}>Sort</MenuItem> */}
        </Menu>
      </div>
    </li>
  );
}

export default Quiz;
