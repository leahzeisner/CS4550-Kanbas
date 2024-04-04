import { useEffect, useState } from "react";
import { FaEllipsisV, FaPlus, FaArrowDown, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { KanbasState } from "../../store";
import "../../styles.css";
import Assignment, { getEmptyAssignment } from "./Assignment";
import "./index.css";
import ToolBar from "./ToolBar";
import { Assignment as AssignmentType, AssignmentsList } from "../../types";
import * as client from "./client";
import { setAssignmentsList } from "./assignmentsReducer";
import AddAssignment from "./AddAssignment";
import EditAssignment from "./EditAssignment";

export const validateAssignmentForm = (
  assignment: AssignmentType,
  time: string,
) => {
  return (
    assignment.title !== "" &&
    assignment.dueDate !== "" &&
    assignment.points !== "" &&
    time !== ""
  );
};

function Assignments() {
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const assignments: AssignmentsList = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignmentsList,
  );
  const [searchAssignmentValue, setSearchAssignmentValue] = useState("");
  const [showAssignments, setShowAssignments] = useState(true);

  const [renderAddAssignment, setRenderAddAssignment] = useState(true);
  const [addingAssignment, setAddingAssignment] = useState(false);

  const [editableAssignment, setEditableAssignment] = useState(
    getEmptyAssignment(courseId),
  );

  useEffect(() => {
    client
      .findCourseAssignments(courseId)
      .then((assignments) => dispatch(setAssignmentsList(assignments)));
  }, [courseId]);

  const getTitleArrow = () => {
    return showAssignments ? (
      <FaArrowDown></FaArrowDown>
    ) : (
      <FaArrowRight></FaArrowRight>
    );
  };

  const getFilteredAssignments = () => {
    return assignments.filter(
      (assignment) =>
        assignment.courseId === courseId &&
        assignment.title
          .toLowerCase()
          .includes(searchAssignmentValue.toLowerCase()),
    );
  };

  const onToolbarAddAssignment = () => {
    toggleAddAssignment(true);
    setEditableAssignment(getEmptyAssignment(courseId));
  };

  const onAssignmentEditToggle = (assignment: AssignmentType) => {
    setEditableAssignment(assignment);
    toggleAddAssignment(false);
  };

  const toggleAddAssignment = (value: boolean) => {
    setRenderAddAssignment(value);
    setAddingAssignment(value);
  };

  return (
    <div className="main-content">
      <div className="assignments">
        <ToolBar
          addingAssignment={addingAssignment}
          onToolbarAddAssignment={onToolbarAddAssignment}
          setSearchAssignmentValue={setSearchAssignmentValue}
        />

        {renderAddAssignment ? (
          <AddAssignment
            addingAssignment={addingAssignment}
            setAddingAssignment={setAddingAssignment}
          />
        ) : (
          <EditAssignment
            editableAssignment={editableAssignment}
            setEditableAssignment={setEditableAssignment}
            setRenderAddAssignment={setRenderAddAssignment}
          />
        )}

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
              <Assignment
                assignment={assignment}
                onAssignmentEditToggle={onAssignmentEditToggle}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Assignments;
