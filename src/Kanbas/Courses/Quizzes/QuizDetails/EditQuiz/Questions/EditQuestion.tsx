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
        updateEditableAnswers(value);
        setEditableQuestion({
          ...editableQuestion,
          type: value,
        });
        return;
      }
    });
  };

  const shouldSaveEditableAnswers = (newQuestionType: QuestionType) => {
    // Should save answers if switching between multiple choice and fill in the blanks
    return (
      (question.type === QuestionType.FILL_IN_BLANKS &&
        newQuestionType === QuestionType.MULTIPLE_CHOICE) ||
      (question.type === QuestionType.MULTIPLE_CHOICE &&
        newQuestionType === QuestionType.FILL_IN_BLANKS)
    );
  };

  const updateEditableAnswers = (newQuestionType: QuestionType) => {
    // If switching to saved question type, load question.answers
    if (question.type === newQuestionType) {
      setEditableAnswers(question.answers);
    }
    // If switching from T/F back to Mult Choice or Fill in Blanks, load question.answers
    else if (
      editableQuestion.type === QuestionType.TRUE_FALSE &&
      question.type !== QuestionType.TRUE_FALSE
    ) {
      setEditableAnswers(question.answers);
    }
    // If switching to True/False question, pre-load both answers
    else if (newQuestionType === QuestionType.TRUE_FALSE) {
      setEditableAnswers([
        { _id: getFreshId(), answer: TRUE, isCorrect: false },
        { _id: getFreshId(), answer: FALSE, isCorrect: false },
      ]);
    } else if (shouldSaveEditableAnswers(newQuestionType)) {
      // all fill in the blank answers are correct
      if (newQuestionType === QuestionType.FILL_IN_BLANKS) {
        setEditableAnswers(
          editableAnswers.map((a) => {
            return { ...a, isCorrect: true };
          }),
        );
      }
    } else {
      setEditableAnswers([]);
    }
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
      {
        _id: getFreshId(),
        answer: "",
        isCorrect: editableQuestion.type === QuestionType.FILL_IN_BLANKS, // all fill in blank answers are correct
      },
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
    let points = 0;
    updatedQuestions.map((q) => (points += parseInt(q.points)));
    setEditableQuiz({
      ...editableQuiz,
      questions: updatedQuestions,
      points: points.toString(),
    });
    setIsEditing(false);
  };

  const onCancel = () => {
    setIsEditing(false);
  };

  const isQuestionValid = () => {
    switch (editableQuestion.type) {
      case QuestionType.MULTIPLE_CHOICE:
        // only one correct answer
        let numMultChoiceCorrect = 0;
        editableAnswers.map((a) => {
          if (a.isCorrect) {
            numMultChoiceCorrect += 1;
          }
        });
        return numMultChoiceCorrect === 1;
      case QuestionType.TRUE_FALSE:
        // either true or false is correct
        console.log(editableAnswers);
        const numAnswers = editableAnswers.length;
        if (numAnswers !== 2) {
          return false;
        }
        const answer1 = editableAnswers[0];
        const answer2 = editableAnswers[1];
        return (
          (answer1.isCorrect && !answer2.isCorrect) ||
          (!answer1.isCorrect && answer2.isCorrect)
        );
      case QuestionType.FILL_IN_BLANKS:
        return editableAnswers.length > 0;
    }
  };

  const getTrueFalseChecked = (val: string) => {
    const valAnswer = editableAnswers.find((a) => a.answer === val);
    if (!valAnswer) return false;
    return valAnswer.isCorrect;
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
              <label
                htmlFor={TRUE}
                style={{
                  color: getTrueFalseChecked(TRUE) ? "darkgreen" : "#3d454c",
                }}
              >
                True
              </label>
              <input
                type="checkbox"
                name="truefalse"
                id={TRUE}
                value={TRUE}
                checked={getTrueFalseChecked(TRUE)}
                onChange={(e) =>
                  setEditableAnswers(
                    editableAnswers.map((a) =>
                      a.answer === TRUE
                        ? { ...a, isCorrect: e.target.checked }
                        : { ...a, isCorrect: !e.target.checked },
                    ),
                  )
                }
              ></input>
              <label
                htmlFor={FALSE}
                style={{
                  color: getTrueFalseChecked(FALSE) ? "darkgreen" : "#3d454c",
                }}
              >
                False
              </label>
              <input
                type="checkbox"
                name="truefalse"
                id={FALSE}
                value={FALSE}
                checked={getTrueFalseChecked(FALSE)}
                onChange={(e) =>
                  setEditableAnswers(
                    editableAnswers.map((a) =>
                      a.answer === FALSE
                        ? { ...a, isCorrect: e.target.checked }
                        : { ...a, isCorrect: !e.target.checked },
                    ),
                  )
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
              disabled={!isQuestionValid()}
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
