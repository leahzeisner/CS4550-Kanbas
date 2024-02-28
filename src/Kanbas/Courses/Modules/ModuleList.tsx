import React, { useEffect, useState } from "react";
import "./index.css";
import "../../styles.css";
import { FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import Module from "./Module";
import AddModule from "./AddModules/AddModule";
import { KanbasState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { Modules } from "../../types";
import { setModulesList } from "./modulesReducer";
import { useParams } from "react-router";

function ModuleList() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const modulesList: Modules = useSelector(
    (state: KanbasState) => state.modulesReducer.modulesList,
  );
  const collapseAll = "Collapse All";
  const [collapseAllText, setCollapseAllText] = useState(collapseAll);
  const [moduleVisibilityMap, setModuleVisibilityMap] = useState<
    Record<string, boolean>
  >({});
  const [addingModule, setAddingModule] = useState(false);

  useEffect(() => {
    const classModules = modulesList.filter(
      (module) => module.courseId === courseId,
    );

    dispatch(setModulesList(classModules));
    createModuleVisibilityMap(classModules);

    if (classModules.length === 0) {
      setCollapseAllText(collapseAll);
    }
  }, []);

  useEffect(() => {
    createModuleVisibilityMap(modulesList);
  }, [modulesList]);

  const createModuleVisibilityMap = (mods: Modules) => {
    const map: Record<string, boolean> = {};
    mods.forEach(
      (mod) =>
        (map[mod._id] =
          moduleVisibilityMap[mod._id] != undefined
            ? moduleVisibilityMap[mod._id]
            : mod.sections?.length > 0 && collapseAllText === "Collapse All"),
    );
    setModuleVisibilityMap(map);
  };

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
        <button
          type="button"
          id="module-button"
          onClick={() => setAddingModule(!addingModule)}
        >
          {addingModule ? (
            "Cancel"
          ) : (
            <>
              <FaPlusCircle className="plus" />
              Module
            </>
          )}
        </button>
        <button type="button" id="top-ellipsis-btn">
          <FaEllipsisV className="ms-2 ellipsis-v" />
        </button>
      </div>

      {addingModule && <AddModule setAddingModule={setAddingModule} />}

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
