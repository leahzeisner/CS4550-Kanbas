import { useState } from "react";
import {
  FaCheckCircle,
  FaEllipsisV,
  FaPlus,
  FaArrowDown,
  FaArrowRight,
} from "react-icons/fa";
import { FaFilePen } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import "../../styles.css";
import "./index.css";

function Assignments() {
  const { courseId } = useParams();
  const assignmentsList = assignments.filter(
    (assignment) => assignment.course === courseId,
  );

  const [showAssignments, setShowAssignments] = useState(true);

  const getTitleArrow = () => {
    return showAssignments ? (
      <FaArrowDown></FaArrowDown>
    ) : (
      <FaArrowRight></FaArrowRight>
    );
  };

  return (
    <div className="main-content">
      <div className="assignments">
        <div className="assignments-toolbar">
          <input
            type="text"
            placeholder="Search for Assignment"
            id="assignment-search"
          ></input>
          <div className="assignments-buttons">
            <button type="button">
              <FaPlus></FaPlus> Group
            </button>
            <button type="button" id="assignment-btn">
              <FaPlus></FaPlus> Assignment
            </button>
            <button type="button">
              <FaEllipsisV className="ms-2 ellipsis-v" />
            </button>
          </div>
        </div>

        <hr className="assignments-buttons-hr" />

        <ul className="list-group wd-assignments">
          <li className="assignment-title">
            <div className="assignment-item-buttons">
              <button type="button">
                <FaEllipsisV className="ms-2 ellipsis-v"></FaEllipsisV>
              </button>
              <button
                type="button"
                onClick={() => setShowAssignments(!showAssignments)}
              >
                {getTitleArrow()}
              </button>
            </div>

            <div className="assignment-text-container">
              <span className="assignment-text">Assignments</span>
            </div>

            <div className="assignment-item-buttons assignment-buttons-right">
              <button type="button" className="modules-btn">
                <FaPlus></FaPlus>
              </button>
              <button type="button" className="modules-btn">
                <FaEllipsisV className="ms-2 ellipsis-v"></FaEllipsisV>
              </button>
            </div>
          </li>

          {assignmentsList.length !== 0 &&
            showAssignments &&
            assignmentsList[0].assignments.map((assignment) => (
              <li className="assignment-item">
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
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Assignments;
