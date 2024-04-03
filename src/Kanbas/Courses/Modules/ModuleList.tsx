import React, { useEffect, useState } from "react";
import "./index.css";
import "../../styles.css";
import { FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import Module from "./Module";
import { KanbasState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Modules } from "../../types";
import { useParams } from "react-router";
import { addModule, setModulesList } from "./modulesReducer";
import { getFreshId } from "../../utils";
import { createModule, findCourseModules } from "./client";

function ModuleList() {
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const courseModules: Modules = useSelector(
    (state: KanbasState) => state.modulesReducer.modulesList,
  );

  const collapseAll = "Collapse All";
  const [collapseAllText, setCollapseAllText] = useState(collapseAll);
  const [moduleVisibilityMap, setModuleVisibilityMap] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    findCourseModules(courseId).then((modules) =>
      dispatch(setModulesList(modules)),
    );
  }, []);

  useEffect(() => {
    createModuleVisibilityMap(courseModules);
    if (courseModules.length === 0) {
      setCollapseAllText(collapseAll);
    }
  }, [courseModules]);

  const createModuleVisibilityMap = (mods: Modules) => {
    const map: Record<string, boolean> = {};
    mods.forEach(
      (mod) =>
        (map[mod._id] =
          moduleVisibilityMap[mod._id] !== undefined
            ? moduleVisibilityMap[mod._id]
            : true),
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
  const toggleModulesVisibility = (visible: boolean) => {
    if (courseModules.length === 0) {
      return;
    }

    const map: Record<string, boolean> = {};
    courseModules.forEach((mod) => (map[mod._id] = visible));
    setModuleVisibilityMap(map);
    setCollapseAllText(visible ? collapseAll : "Expand All");
  };

  const onAddModule = () => {
    toggleModulesVisibility(false);
    const emptyModule = {
      _id: getFreshId(),
      courseId: courseId,
      title: "",
      sections: [],
    };
    createModule(courseId, emptyModule).then((module) => {
      dispatch(addModule(module));
    });
  };

  return (
    <div className="modules">
      <div className="module-buttons">
        <button
          type="button"
          onClick={() =>
            toggleModulesVisibility(collapseAllText !== collapseAll)
          }
          disabled={courseModules.length === 0}
          id="collapse-all-btn"
        >
          {collapseAllText}
        </button>
        <button type="button">View Progress</button>
        <select style={{ width: "fit-content" }}>
          <option value="PUBLISH-ALL"> Publish All</option>
        </select>
        <button type="button" id="module-button" onClick={onAddModule}>
          <FaPlusCircle className="plus" />
          Module
        </button>
        <button type="button" id="top-ellipsis-btn">
          <FaEllipsisV className="ms-2 ellipsis-v" />
        </button>
      </div>

      <hr className="module-buttons-hr" />

      <ul className="modules-list">
        {courseModules.map((module) => (
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
