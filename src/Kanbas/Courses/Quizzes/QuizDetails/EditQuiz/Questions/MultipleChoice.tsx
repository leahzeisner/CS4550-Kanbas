import React, { useEffect, useState } from "react";
import { Question as QuestionType } from "../../../../../types";
import Question from "./Question";

function MultipleChoice({
  question,
  newQuestion,
}: {
  question: QuestionType;
  newQuestion: QuestionType | undefined;
}) {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(newQuestion?._id === question._id);
  }, []);

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

export default MultipleChoice;
