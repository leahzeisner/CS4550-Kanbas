import { FaCheckCircle, FaEdit, FaEllipsisV } from "react-icons/fa";
import { FaFilePen, FaX } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Assignment as AssignmentType } from "../../types";
import { formatDateTime, getFreshId } from "../../utils";
import { deleteAssignment } from "./assignmentsReducer";
import * as client from "./client";
interface AssignmentProps {
  assignment: AssignmentType;
  onAssignmentEditToggle: (assignment: AssignmentType) => void;
  checkEditableAssignment: (assignment: AssignmentType) => void;
}

export const getEmptyAssignment = (courseId: string | undefined) => {
  return {
    _id: getFreshId(),
    courseId: courseId || "",
    title: "",
    dueDate: "",
    points: "",
  };
};

const Assignment = ({
  assignment,
  onAssignmentEditToggle,
  checkEditableAssignment,
}: AssignmentProps) => {
  const dispatch = useDispatch();

  const onDeleteAssignment = () => {
    client.deleteAssignment(assignment._id).then(() => {
      dispatch(deleteAssignment(assignment));
      checkEditableAssignment(assignment);
    });
  };

  return (
    <li className="assignment-item" key={assignment._id}>
      <div className="assignment-item-buttons">
        <button type="button">
          <FaEllipsisV className="ms-2 ellipsis-v"></FaEllipsisV>
        </button>
        <button
          type="button"
          onClick={() => onAssignmentEditToggle(assignment)}
        >
          <FaFilePen></FaFilePen>
        </button>
      </div>

      <div className="assignment-info assignment-text-container">
        <div className="assignment-item-title">{assignment.title}</div>
        <div className="assignment-item-due-date">
          <span>Due </span>
          <span>
            {formatDateTime(assignment.dueDate)} | {assignment.points} pts
          </span>
        </div>
      </div>

      <div className="assignment-item-buttons assignment-buttons-right">
        <button type="button">
          <FaCheckCircle className="text-success check-circle" />
        </button>
        <button
          type="button"
          style={{ marginLeft: "10px" }}
          onClick={() => onAssignmentEditToggle(assignment)}
        >
          <FaEdit className="ms-2 text-success" />
        </button>
        <button
          type="button"
          id="delete-module-item-btn"
          onClick={onDeleteAssignment}
        >
          <FaX className="ms-2" />
        </button>
      </div>
    </li>
  );
};

export default Assignment;
