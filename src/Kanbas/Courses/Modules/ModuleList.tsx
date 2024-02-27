import React, { useEffect, useState } from "react";
import "./index.css";
import "../../styles.css";
import { FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Modules } from "../../types";
import Module from "./Module";

function ModuleList({
  modulesList,
  setModulesList,
}: {
  modulesList: Modules;
  setModulesList: (modules: Modules) => void;
}) {
  const collapseAll = "Collapse All";
  const [collapseAllText, setCollapseAllText] = useState(collapseAll);
  const [moduleVisibilityMap, setModuleVisibilityMap] = useState<
    Record<string, boolean>
  >({});

  // Open all modules on load
  useEffect(() => {
    const map: Record<string, boolean> = {};
    modulesList.forEach((mod) => (map[mod._id] = true));
    setModuleVisibilityMap(map);
  }, [modulesList]);

  // Toggle module with given id's visibility
  const toggleModuleVisibility = (modId: string) => {
    setModuleVisibilityMap((prevState) => ({
      ...prevState,
      [modId]: !prevState[modId],
    }));
  };

  // Collapse or expand all modules
  const toggleModulesVisibility = () => {
    if (modulesList.length === 0) {
      return;
    }
    const visible = collapseAllText !== collapseAll;
    const map: Record<string, boolean> = {};
    modulesList.forEach((mod) => (map[mod._id] = visible));
    setModuleVisibilityMap(map);
    setCollapseAllText(visible ? collapseAll : "Expand All");
  };

  return (
    <div className="modules">
      <div className="module-buttons">
        <button
          type="button"
          onClick={toggleModulesVisibility}
          disabled={modulesList.length === 0}
          id="collapse-all-btn"
        >
          {collapseAllText}
        </button>
        <button type="button">View Progress</button>
        <select>
          <option value="PUBLISH-ALL"> Publish All</option>
        </select>
        <button type="button" id="module-button">
          <FaPlusCircle className="plus" />
          Module
        </button>
        <button type="button" id="top-ellipsis-btn">
          <FaEllipsisV className="ms-2 ellipsis-v" />
        </button>
      </div>

      <hr className="module-buttons-hr" />

      <ul className="modules-list">
        {modulesList.map((module) => (
          <Module
            module={module}
            moduleVisibilityMap={moduleVisibilityMap}
            toggleModuleVisibility={toggleModuleVisibility}
          />
        ))}
      </ul>
    </div>
  );
}
export default ModuleList;
