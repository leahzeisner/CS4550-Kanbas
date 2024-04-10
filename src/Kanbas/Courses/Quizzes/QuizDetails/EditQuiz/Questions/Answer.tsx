import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaCheck, FaX } from "react-icons/fa6";
import { Answer as AnswerType, Answers, Question } from "../../../../../types";

function Answer({
  answer,
  editableAnswers,
  setEditableAnswers,
}: {
  answer: AnswerType;
  index: number;
  editableQuestion: Question;
  editableAnswers: Answers;
  setEditableAnswers: (choices: Answers) => void;
}) {
  const [editableAnswer, setEditableAnswer] = useState(answer);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    setEditableAnswer(answer);
    setIsEditingTitle(answer.answer === "");
  }, [answer, editableAnswers]);

  const onEditToggle = () => {
    if (isEditingTitle) {
      const updatedAnswers = editableAnswers.map((a) =>
        a._id === editableAnswer._id ? editableAnswer : a,
      );
      setEditableAnswers(updatedAnswers);
    }
    setIsEditingTitle(!isEditingTitle);
  };

  const getCorrectStyle = () => {
    return {
      color: editableAnswer.isCorrect ? "darkgreen" : "#3d454c",
    };
  };

  const onDeleteAnswer = () => {
    setEditableAnswers(editableAnswers.filter((a) => a !== answer));
  };

  const onChangeIsCorrect = () => {
    const updatedAnswer = {
      ...editableAnswer,
      isCorrect: !editableAnswer.isCorrect,
    };
    setEditableAnswer(updatedAnswer);

    const updatedAnswers = editableAnswers.map((a) =>
      a._id === updatedAnswer._id ? updatedAnswer : a,
    );
    setEditableAnswers(updatedAnswers);
  };

  return (
    <li key={answer._id} className="answer">
      <span id="answerLabel" style={getCorrectStyle()}>
        {editableAnswer.isCorrect ? "Correct" : "Possible"} Answer:{" "}
      </span>
      <input
        type="text"
        placeholder="Answer"
        value={editableAnswer.answer}
        onChange={(e) =>
          setEditableAnswer({ ...editableAnswer, answer: e.target.value })
        }
        disabled={!isEditingTitle}
      />
      <button
        type="button"
        id="editAnswerBtn"
        onClick={onEditToggle}
        style={getCorrectStyle()}
        disabled={
          isEditingTitle &&
          editableAnswers.filter(
            (a) =>
              a._id !== editableAnswer._id &&
              a.answer === editableAnswer.answer,
          ).length > 0
        }
      >
        {isEditingTitle ? <FaCheck /> : <FaEdit />}
      </button>
      <button type="button" id="deleteAnswerBtn" onClick={onDeleteAnswer}>
        <FaX />
      </button>

      <label htmlFor="isCorrect" style={getCorrectStyle()}>
        Is Correct?
      </label>
      <input
        type="checkbox"
        id="isCorrect"
        checked={editableAnswer.isCorrect}
        onChange={onChangeIsCorrect}
      />
    </li>
  );
}

export default Answer;
