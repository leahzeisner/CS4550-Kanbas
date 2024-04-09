import { useState } from "react";
import { Question as QuestionType } from "../../../../../types";
import Question from "./Question";

function FillInBlank({ question }: { question: QuestionType }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <h1>Editing</h1>
      ) : (
        <Question question={question} setIsEditing={setIsEditing} />
      )}
    </>
  );
}

export default FillInBlank;
