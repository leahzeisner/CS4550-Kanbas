import { FaEllipsisV, FaPlus } from "react-icons/fa";

interface ToolBarProps {
  addingAssignment: boolean;
  setSearchAssignmentValue: (value: string) => void;
  onToolbarAddAssignment: () => void;
}

const ToolBar = ({
  addingAssignment,
  setSearchAssignmentValue,
  onToolbarAddAssignment,
}: ToolBarProps) => {
  return (
    <>
      <div className="assignments-toolbar">
        <input
          type="text"
          placeholder="Search for Assignment"
          id="assignment-search"
          onChange={(e) =>
            setSearchAssignmentValue(e.target.value.toLowerCase())
          }
        ></input>
        <div className="assignments-buttons">
          <button type="button">
            <FaPlus className="assignments-buttons-icons"></FaPlus> Group
          </button>
          <button
            type="button"
            id="assignment-btn"
            onClick={() => onToolbarAddAssignment()}
            disabled={addingAssignment}
          >
            <FaPlus className="assignments-buttons-icons"></FaPlus> Assignment
          </button>
          <button type="button" id="assignments-button-ellipsis">
            <FaEllipsisV className="ms-2 ellipsis-v" />
          </button>
        </div>
      </div>

      <hr className="assignments-buttons-hr" />
    </>
  );
};

export default ToolBar;
