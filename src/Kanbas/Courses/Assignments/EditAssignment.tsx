import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Assignment } from "../../types";
import { validateAssignmentForm } from ".";
import { getEmptyAssignment } from "./Assignment";
import { updateAssignment } from "./assignmentsReducer";
import * as client from "./client";

interface EditAssignmentProps {
  editableAssignment: Assignment;
  setEditableAssignment: (assignment: Assignment) => void;
  setRenderAddAssignment: (isAdding: boolean) => void;
}

function EditAssignment({
  editableAssignment,
  setEditableAssignment,
  setRenderAddAssignment,
}: EditAssignmentProps) {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [time, setTime] = useState("");
  const [updateAssignmentEnabled, setUpdateAssignmentEnabled] = useState(true);

  useEffect(() => {
    setUpdateAssignmentEnabled(
      validateAssignmentForm(editableAssignment, time),
    );
  }, [editableAssignment, time]);

  const onUpdateAssignment = () => {
    if (validateAssignmentForm(editableAssignment, time)) {
      client
        .updateAssignment(editableAssignment)
        .then(() => dispatch(updateAssignment(editableAssignment)));
      setEditableAssignment(getEmptyAssignment(courseId));
      setRenderAddAssignment(true);
    }
  };

  const onCancelEdit = () => {
    setEditableAssignment(getEmptyAssignment(courseId));
    setRenderAddAssignment(true);
  };

  return (
    <div className="add-edit-courses">
      <div className="add-edit-courses-container">
        <input
          value={editableAssignment.title}
          placeholder="Assignment Title"
          className="form-control add-edit-courses-input"
          type="text"
          onChange={(e) =>
            setEditableAssignment({
              ...editableAssignment,
              title: e.target.value,
            })
          }
        />
        <input
          value={editableAssignment.points}
          placeholder="Assignment Points"
          className="form-control add-edit-courses-input"
          type="text"
          onChange={(e) =>
            setEditableAssignment({
              ...editableAssignment,
              points: e.target.value,
            })
          }
        />

        <input
          value={editableAssignment.dueDate}
          placeholder="Assignment Due Date"
          className="form-control add-edit-courses-input"
          type="date"
          onChange={(e) =>
            setEditableAssignment({
              ...editableAssignment,
              dueDate: e.target.value,
            })
          }
        />

        <input
          value={time}
          placeholder="Assignment Due Date Time"
          className="form-control add-edit-courses-input"
          type="time"
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div className="add-course-add-btn">
        <button
          type="button"
          id="addEditCourseBtn"
          onClick={onUpdateAssignment}
          disabled={!updateAssignmentEnabled}
        >
          Update
        </button>
        <button
          type="button"
          id="addEditCourseBtn"
          className="cancel-add-assignment"
          onClick={onCancelEdit}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditAssignment;
