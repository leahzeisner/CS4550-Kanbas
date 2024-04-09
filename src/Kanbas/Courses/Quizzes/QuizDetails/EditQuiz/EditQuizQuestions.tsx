import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Question, Quiz } from "../../../../types";
import { getFreshId } from "../../../../utils";
import FillInBlank from "./Questions/FillInBlank";
import MultipleChoice from "./Questions/MultipleChoice";
import TrueFalse from "./Questions/TrueFalse";

function EditQuizQuestions({
  editableQuiz,
  setEditableQuiz,
}: {
  editableQuiz: Quiz;
  setEditableQuiz: (quiz: Quiz) => void;
}) {
  const [newQuestion, setNewQuestion] = useState<Question | undefined>(
    undefined,
  );

  const onNewQuestion = () => {
    const emptyQuestion = {
      _id: getFreshId(),
      type: "MULTIPLE-CHOICE",
      title: "Unnamed Quiz Question",
      question:
        "Quiz DescriptionQuiz DescriptionQuiz DescriptionQuiz DescriptionQuiz DescriptionQuiz DescriptionQuiz DescriptionQuiz DescriptionQuiz DescriptionQuiz Description",
      choices: [],
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
        <button type="button" onClick={onNewQuestion}>
          <FaPlus className="ms-2" /> New Question
        </button>
      </div>

      <ul className="quiz-questions">
        {editableQuiz.questions.map((q: Question) => {
          switch (q.type) {
            case "MULTIPLE-CHOICE":
              return <MultipleChoice question={q} newQuestion={newQuestion} />;
            case "TRUE-FALSE":
              return <TrueFalse question={q} />;
            case "FILL-IN-BLANKS":
              return <FillInBlank question={q} />;
          }
        })}
      </ul>
    </div>
  );
}

export default EditQuizQuestions;
