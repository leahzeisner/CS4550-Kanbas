import React, { useEffect, useState } from "react";
import "./index.css";
import "../../styles.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { Modules } from "../../types";
import Module from "./Module";

function ModuleList() {
  const { courseId } = useParams();

  const [modulesList, setModulesList] = useState<Modules | undefined>(
    undefined,
  );
  const collapseAll = "Collapse All";
  const [collapseAllText, setCollapseAllText] = useState(collapseAll);
  const [moduleVisibilityMap, setModuleVisibilityMap] = useState<
    Record<string, boolean>
  >({});

  // Initialize course modules and open all modules on load
  useEffect(() => {
    const courseModules = modules.filter(
      (module) => module.course === courseId,
    );

    const map: Record<string, boolean> = {};
    courseModules.forEach((mod) => (map[mod._id] = true));
    setModuleVisibilityMap(map);
    setModulesList(courseModules);
  }, [courseId]);

  // Toggle module with given id's visibility
  const toggleModuleVisibility = (modId: string) => {
    setModuleVisibilityMap((prevState) => ({
      ...prevState,
      [modId]: !prevState[modId],
    }));
  };

  // Collapse or expand all modules
  const toggleModulesVisibility = () => {
    if (!modulesList || modulesList.length === 0) {
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
        <button type="button" onClick={toggleModulesVisibility}>
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
        {modulesList?.map((module) => (
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
