import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  Question as Question_Type,
  QuestionType,
  Quiz,
} from "../../../../types";
import { getFreshId } from "../../../../utils";
import Question from "./Questions/Question";

function EditQuizQuestions({
  editableQuiz,
  setEditableQuiz,
}: {
  editableQuiz: Quiz;
  setEditableQuiz: (quiz: Quiz) => void;
}) {
  const [newQuestion, setNewQuestion] = useState<Question_Type | undefined>(
    undefined,
  );

  const onNewQuestion = () => {
    const emptyQuestion: Question_Type = {
      questionId: getFreshId(),
      type: QuestionType.MULTIPLE_CHOICE,
      title: "Unnamed Quiz Question",
      question: "",
      answers: [],
      points: "",
    };
    setNewQuestion(emptyQuestion);
    setEditableQuiz({
      ...editableQuiz,
      questions: [...editableQuiz.questions, emptyQuestion],
    });
  };

  return (
    <div className="questions-container">
      <div className="toolbar-buttons new-question">
        <button type="button" onClick={onNewQuestion} id="newQuestionBtn">
          <FaPlus id="newQuestionPlusIcon" /> New Question
        </button>
      </div>

      <ul className="quiz-questions">
        {editableQuiz.questions.map((q: Question_Type) => {
          return (
            <Question
              editableQuiz={editableQuiz}
              setEditableQuiz={setEditableQuiz}
              question={q}
              newQuestion={newQuestion}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default EditQuizQuestions;
