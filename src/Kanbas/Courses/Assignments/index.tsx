import { ChangeEvent, useEffect, useState } from "react";
import { FaEllipsisV, FaPlus, FaArrowDown, FaArrowRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { assignments } from "../../Database";
import "../../styles.css";
import { AssignmentsList, CourseAssignments } from "../../types";
import Assignment from "./Assignment";
import "./index.css";
import ToolBar from "./ToolBar";

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
      (assignment) =>
        assignment.title.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setAssignmentsList(filteredAssignments);
  };

  return (
    <div className="main-content">
      <div className="assignments">
        <ToolBar filterAssignments={filterAssignments} />

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
              <Assignment assignment={assignment} />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Assignments;
