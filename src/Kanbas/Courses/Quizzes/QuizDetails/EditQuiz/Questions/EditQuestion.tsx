import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Answers, Question, QuestionType, Quiz } from "../../../../../types";
import { getFreshId } from "../../../../../utils";
import Answer from "./Answer";

const questionTypeMap = {
  "Multiple Choice": QuestionType.MULTIPLE_CHOICE,
  "True/False": QuestionType.TRUE_FALSE,
  "Fill in the Blanks": QuestionType.FILL_IN_BLANKS,
};
const TRUE = "TRUE";
const FALSE = "FALSE";

function EditQuestion({
  editableQuiz,
  setEditableQuiz,
  question,
  setIsEditing,
}: {
  editableQuiz: Quiz;
  setEditableQuiz: (q: Quiz) => void;
  question: Question;
  setIsEditing: (b: boolean) => void;
}) {
  const [editableQuestion, setEditableQuestion] = useState<Question>(question);
  const [editableAnswers, setEditableAnswers] = useState<Answers>(
    question.answers,
  );

  useEffect(() => {
    setEditableQuestion(question);
    setEditableAnswers(question.answers);
  }, [question]);

  const onChangeQuestionType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    Object.entries(questionTypeMap).forEach(([key, value]) => {
      if (key === e.target.value) {
        const answers = question.type === value ? question.answers : [];
        setEditableQuestion({
          ...editableQuestion,
          type: value,
          answers,
        });
        return;
      }
    });
  };

  const getQuestionType = () => {
    let type = "Multiple Choice";
    Object.entries(questionTypeMap).forEach(([key, value]) => {
      if (value === editableQuestion.type) {
        type = key;
        return;
      }
    });
    return type;
  };

  const getBlurb = () => {
    switch (editableQuestion.type) {
      case QuestionType.MULTIPLE_CHOICE:
        return "Enter your question and multiple answers, then select the one correct answer.";
      case QuestionType.TRUE_FALSE:
        return "Enter your question text, then select if True or False is the correct answer.";
      case QuestionType.FILL_IN_BLANKS:
        return "Enter your question text, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer.";
    }
  };

  const onAddAnswer = () => {
    setEditableAnswers([
      ...editableAnswers,
      { _id: getFreshId(), answer: "", isCorrect: false },
    ]);
  };

  const onUpdateQuestion = () => {
    const updatedQuestions = editableQuiz.questions.map((q) =>
      q._id === editableQuestion._id
        ? {
            ...editableQuestion,
            answers: editableAnswers,
          }
        : q,
    );
    setEditableQuiz({ ...editableQuiz, questions: updatedQuestions });
    setIsEditing(false);
  };

  const onCancel = () => {
    setIsEditing(false);
  };

  return (
    <li key={editableQuestion._id} className="edit-question">
      <div className="edit-question-top">
        <div className="edit-question-top-left">
          <input
            type="text"
            id="editQuestionTitle"
            placeholder="Question Title"
            value={editableQuestion.title}
            onChange={(e) =>
              setEditableQuestion({
                ...editableQuestion,
                title: e.target.value,
              })
            }
          />

          <select
            id="editQuestionType"
            value={getQuestionType()}
            onChange={(e) => onChangeQuestionType(e)}
          >
            {Object.keys(questionTypeMap).map((key) => (
              <option>{key}</option>
            ))}
          </select>
        </div>

        <div className="edit-question-top-right">
          <span>pts:</span>
          <input
            type="number"
            id="editQuestionPoints"
            min="0"
            value={editableQuestion.points || "0"}
            onChange={(e) =>
              setEditableQuestion({
                ...editableQuestion,
                points: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="edit-question-bottom">
        <span id="editQuestionBlurb">{getBlurb()}</span>

        <div className="edit-question-question">
          <span id="editQuestionQuestion">Question:</span>
          <textarea
            id="editQuestionQuestionText"
            value={editableQuestion.question}
            rows={4}
            placeholder="Enter the Question"
            onChange={(e) =>
              setEditableQuestion({
                ...editableQuestion,
                question: e.target.value,
              })
            }
          />
        </div>

        <div className="edit-question-answers">
          <span id="editQuestionAnswers">Answers:</span>

          {editableQuestion.type !== QuestionType.TRUE_FALSE && (
            <>
              <ul className="edit-question-answers-answers">
                {editableAnswers.map((a, index) => (
                  <Answer
                    answer={a}
                    index={index}
                    editableQuestion={editableQuestion}
                    editableAnswers={editableAnswers}
                    setEditableAnswers={setEditableAnswers}
                  />
                ))}
              </ul>

              <button type="button" id="addAnswerBtn" onClick={onAddAnswer}>
                <FaPlus /> Add Answer
              </button>
            </>
          )}

          {editableQuestion.type === QuestionType.TRUE_FALSE && (
            <div className="true-false-answer">
              <span>Choose the correct answer:</span>
              <label htmlFor={TRUE}>True</label>
              <input
                type="checkbox"
                name="truefalse"
                id={TRUE}
                value={TRUE}
                checked={
                  editableAnswers.length > 0 &&
                  editableAnswers[0].answer === TRUE
                }
                onChange={(e) => {
                  setEditableAnswers([
                    {
                      _id: getFreshId(),
                      answer: e.target.checked ? TRUE : FALSE,
                      isCorrect: true,
                    },
                  ]);
                }}
              ></input>
              <label htmlFor={FALSE}>False</label>
              <input
                type="checkbox"
                name="truefalse"
                id={FALSE}
                value={FALSE}
                checked={
                  editableAnswers.length > 0 &&
                  editableAnswers[0].answer === FALSE
                }
                onChange={(e) =>
                  setEditableAnswers([
                    {
                      _id: getFreshId(),
                      answer: e.target.checked ? FALSE : TRUE,
                      isCorrect: true,
                    },
                  ])
                }
              ></input>
            </div>
          )}

          <div className="edit-question-footer toolbar-buttons">
            <button id="cancelUpdateQuestion" type="button" onClick={onCancel}>
              Cancel
            </button>
            <button
              id="updateQuestion"
              type="button"
              onClick={onUpdateQuestion}
            >
              Update Question
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default EditQuestion;
