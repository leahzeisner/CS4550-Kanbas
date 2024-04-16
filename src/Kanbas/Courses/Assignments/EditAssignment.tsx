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
    // Trim due date if necesary
    const assignmentDueDate = editableAssignment.dueDate;
    if (assignmentDueDate.length > 10) {
      setEditableAssignment({
        ...editableAssignment,
        dueDate: assignmentDueDate.substring(0, 10),
      });
    }

    // Set time if necesary
    if (time === "" && assignmentDueDate !== "") {
      const dueDate = new Date(assignmentDueDate);

      const hours = ("0" + dueDate.getHours()).slice(-2);
      const minutes = ("0" + dueDate.getMinutes()).slice(-2);

      // Format time
      const formattedTime = `${hours}:${minutes}`;
      setTime(formattedTime);
    }
    setUpdateAssignmentEnabled(
      validateAssignmentForm(editableAssignment, time),
    );
  }, [editableAssignment, time]);

  const onUpdateAssignment = () => {
    if (validateAssignmentForm(editableAssignment, time)) {
      const dueDate = new Date(
        editableAssignment.dueDate + "T" + time,
      ).toISOString();

      const updatedAssignment = {
        ...editableAssignment,
        dueDate,
      };
      client
        .updateAssignment(updatedAssignment)
        .then(() => dispatch(updateAssignment(updatedAssignment)));
      setEditableAssignment(getEmptyAssignment(courseId));
      setRenderAddAssignment(true);
    }
  };

  const onCancelEdit = () => {
    setEditableAssignment(getEmptyAssignment(courseId));
    setRenderAddAssignment(true);
  };

  const handlePointsChange = (e: any) => {
    let value = e.target.value;
    value = Math.max(0, Math.min(200, value));
    setEditableAssignment({ ...editableAssignment, points: value });
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
          type="number"
          min={0}
          max={200}
          onChange={(e) => handlePointsChange(e)}
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
          className="cancel-add-assignment"
          onClick={onCancelEdit}
        >
          Cancel
        </button>
        <button
          type="button"
          id="addEditCourseBtn"
          onClick={onUpdateAssignment}
          disabled={!updateAssignmentEnabled}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default EditAssignment;
