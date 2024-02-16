import { ChangeEvent, useEffect, useState } from "react";
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
import { AssignmentsList, CourseAssignments } from "../../types";
import "./index.css";

function Assignments() {
  const { courseId } = useParams();

  const [courseAssignments, setCourseAssignments] = useState<
    CourseAssignments | undefined
  >(undefined);

  const [assignmentsList, setAssignmentsList] = useState<
    AssignmentsList | undefined
  >(undefined);

  const [showAssignments, setShowAssignments] = useState(true);

  useEffect(() => {
    const courseAssignments = assignments.filter(
      (assignment) => assignment.course === courseId,
    );
    setCourseAssignments(
      courseAssignments.length > 0 ? courseAssignments[0] : undefined,
    );
    setAssignmentsList(
      courseAssignments.length > 0
        ? courseAssignments[0].assignments
        : undefined,
    );
  }, []);

  const getTitleArrow = () => {
    return showAssignments ? (
      <FaArrowDown></FaArrowDown>
    ) : (
      <FaArrowRight></FaArrowRight>
    );
  };

  const filterAssignments = (e: ChangeEvent<HTMLInputElement>) => {
    if (!courseAssignments) {
      return;
    }

    const filteredAssignments = courseAssignments.assignments.filter(
      (assignment) => assignment.title.includes(e.target.value),
    );
    setAssignmentsList(filteredAssignments);
  };

  return (
    <div className="main-content">
      <div className="assignments">
        <div className="assignments-toolbar">
          <input
            type="text"
            placeholder="Search for Assignment"
            id="assignment-search"
            onChange={(e) => filterAssignments(e)}
          ></input>
          <div className="assignments-buttons">
            <button type="button">
              <FaPlus className="assignments-buttons-icons"></FaPlus> Group
            </button>
            <button type="button" id="assignment-btn">
              <FaPlus className="assignments-buttons-icons"></FaPlus> Assignment
            </button>
            <button type="button" id="assignments-button-ellipsis">
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

          {showAssignments &&
            assignmentsList?.map((assignment) => (
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
