import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { FaFilePen } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Assignment as AssignmentType } from "../../types";
interface AssignmentProps {
  assignment: AssignmentType;
}

const Assignment = ({ assignment }: AssignmentProps) => {
  return (
    <li className="assignment-item" key={assignment._id}>
      <div className="assignment-item-buttons">
        <button type="button">
          <FaEllipsisV className="ms-2 ellipsis-v"></FaEllipsisV>
        </button>
        <button type="button">
          <FaFilePen></FaFilePen>
        </button>
      </div>

      <div className="assignment-info assignment-text-container">
        <Link to={assignment.url} className="assignment-item-title">
          {assignment.title}
        </Link>
        <div className="assignment-item-due-date">
          <span>Due </span>
          <span>
            {assignment.due_date} | {assignment.points} pts
          </span>
        </div>
      </div>

      <div className="assignment-item-buttons assignment-buttons-right">
        <button type="button">
          <FaCheckCircle className="text-success check-circle" />
        </button>
        <button type="button">
          <FaEllipsisV className="ms-2 ellipsis-v"></FaEllipsisV>
        </button>
      </div>
    </li>
  );
};

export default Assignment;
