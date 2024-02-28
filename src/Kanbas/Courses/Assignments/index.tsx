import { useEffect, useState } from "react";
import { FaEllipsisV, FaPlus, FaArrowDown, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { KanbasState } from "../../store";
import "../../styles.css";
import Assignment from "./Assignment";
import "./index.css";
import ToolBar from "./ToolBar";
import { setAssignmentsList } from "./assignmentsReducer";
import { AssignmentsList } from "../../types";

function Assignments() {
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const assignments: AssignmentsList = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignmentsList,
  );
  const [searchAssignmentValue, setSearchAssignmentValue] = useState("");
  const [showAssignments, setShowAssignments] = useState(true);

  useEffect(() => {
    dispatch(
      setAssignmentsList(
        assignments.filter((assignment) => assignment.courseId === courseId),
      ),
    );
  }, []);

  const getTitleArrow = () => {
    return showAssignments ? (
      <FaArrowDown></FaArrowDown>
    ) : (
      <FaArrowRight></FaArrowRight>
    );
  };

  const getFilteredAssignments = () => {
    return assignments.filter((assignment) =>
      assignment.title
        .toLowerCase()
        .includes(searchAssignmentValue.toLowerCase()),
    );
  };

  return (
    <div className="main-content">
      <div className="assignments">
        <ToolBar setSearchAssignmentValue={setSearchAssignmentValue} />

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
            getFilteredAssignments().map((assignment) => (
              <Assignment assignment={assignment} />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Assignments;
