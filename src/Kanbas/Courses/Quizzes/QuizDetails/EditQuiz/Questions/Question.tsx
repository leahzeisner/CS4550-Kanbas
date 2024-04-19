import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Question as QuestionType, Quiz } from "../../../../../types";
import EditQuestion from "./EditQuestion";

function Question({
  question,
  newQuestion,
  editableQuiz,
  setEditableQuiz,
}: {
  question: QuestionType;
  newQuestion: QuestionType | undefined;
  editableQuiz: Quiz;
  setEditableQuiz: (q: Quiz) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(newQuestion?.questionId === question.questionId);
  }, [newQuestion]);

  const onDeleteQuestion = () => {
    setEditableQuiz({
      ...editableQuiz,
      questions: editableQuiz.questions.filter(
        (q) => q.questionId !== question.questionId,
      ),
    });
  };

  return (
    <>
      {isEditing ? (
        <EditQuestion
          editableQuiz={editableQuiz}
          setEditableQuiz={setEditableQuiz}
          question={question}
          setIsEditing={setIsEditing}
        />
      ) : (
        <li key={question.questionId} className="question">
          <div className="question-left">
            <div className="question-top">
              <span className="question-title">{question.title}</span>
              <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
              <span className="question-points">
                {question.points || "0"} pts
              </span>
            </div>

            <span className="quiz-question">{question.question || "..."}</span>
          </div>

          <div className="question-right">
            <button
              type="button"
              id="editQuestionButton"
              onClick={() => setIsEditing(true)}
            >
              <FaEdit />
            </button>
            <button
              type="button"
              id="deleteQuestionButton"
              onClick={onDeleteQuestion}
            >
              <FaX />
            </button>
          </div>
        </li>
      )}
    </>
  );
}

export default Question;
