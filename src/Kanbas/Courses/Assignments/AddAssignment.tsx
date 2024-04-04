import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Assignment } from "../../types";
import { addAssignment } from "./assignmentsReducer";
import { validateAssignmentForm } from ".";
import * as client from "./client";
import { getEmptyAssignment } from "./Assignment";

function AddAssignment({
  addingAssignment,
  setAddingAssignment,
}: {
  addingAssignment: boolean;
  setAddingAssignment: (value: boolean) => void;
}) {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [assignment, setAssignment] = useState<Assignment>(
    getEmptyAssignment(courseId),
  );
  const [time, setTime] = useState("");
  const [addAssignmentEnabled, setAddAssignmentEnabled] = useState(true);

  useEffect(() => {
    setAddAssignmentEnabled(validateAssignmentForm(assignment, time));
  }, [assignment, time]);

  const addNewAssignment = async () => {
    const dueDate = new Date(assignment.dueDate + "T" + time).toISOString();
    client
      .createAssignment(courseId, {
        ...assignment,
        dueDate,
      })
      .then((a) => dispatch(addAssignment(a)));
    reset();
  };

  const reset = () => {
    setAssignment(getEmptyAssignment(courseId));
    setTime("");
    setAddingAssignment(false);
  };

  const handlePointsChange = (e: any) => {
    let value = e.target.value;
    value = Math.max(0, Math.min(200, value));
    setAssignment({ ...assignment, points: value });
  };

  return (
    <div>
      {addingAssignment && (
        <div className="add-edit-courses">
          <div className="add-edit-courses-container">
            <input
              value={assignment.title}
              placeholder="Assignment Title"
              className="form-control add-edit-courses-input"
              type="text"
              onChange={(e) =>
                setAssignment({ ...assignment, title: e.target.value })
              }
            />
            <input
              value={assignment.points}
              placeholder="Assignment Points"
              className="form-control add-edit-courses-input"
              type="number"
              min={0}
              max={200}
              onChange={(e) => handlePointsChange(e)}
            />

            <input
              value={assignment.dueDate}
              placeholder="Assignment Due Date"
              className="form-control add-edit-courses-input"
              type="date"
              onChange={(e) =>
                setAssignment({ ...assignment, dueDate: e.target.value })
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
              onClick={reset}
            >
              Cancel
            </button>
            <button
              type="button"
              id="addEditCourseBtn"
              onClick={addNewAssignment}
              disabled={!addAssignmentEnabled}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddAssignment;
