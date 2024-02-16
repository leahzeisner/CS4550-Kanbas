import React, { useEffect, useState } from "react";
import "./index.css";
import "../../styles.css";
import { modules } from "../../Database";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlusCircle,
  FaArrowDown,
  FaArrowRight,
} from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Modules } from "../../types";

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

  // Renders arrow icon based on module visibility
  const getTitleArrow = (modId: string) => {
    const moduleVisibile = moduleVisibilityMap[modId];

    return moduleVisibile ? (
      <FaArrowDown className="ms-2"></FaArrowDown>
    ) : (
      <FaArrowRight className="ms-2"></FaArrowRight>
    );
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
          <li className="module" key={module._id}>
            <ul className="module-list">
              {/* Module Title */}
              <li className="module-title">
                <div className="module-list-buttons">
                  <button
                    type="button"
                    onClick={() => toggleModuleVisibility(module._id)}
                  >
                    {getTitleArrow(module._id)}
                  </button>
                </div>

                <div className="module-title-text">
                  <span className="module-section">{module.title}</span>
                </div>

                <div className="module-list-buttons modules-buttons-right">
                  <button type="button">
                    <FaCheckCircle className="text-success" />
                  </button>
                  <button type="button">
                    <FaPlusCircle className="ms-2" />
                  </button>
                  <button type="button">
                    <FaEllipsisV className="ms-2 ellipsis-v" />
                  </button>
                </div>
              </li>

              {/* Module Sections */}
              {moduleVisibilityMap[module._id] &&
                module.sections?.map((section, index) => (
                  <div
                    key={`${module._id}-${section.title}-${index}`}
                    className="module-section-div"
                  >
                    <li className="module-section-title">
                      <div>
                        <FaEllipsisV className="ms-2 ellipsis-v ellipsis-left"></FaEllipsisV>
                      </div>

                      <div className="module-title-text">
                        <span className="module-section">{section.title}</span>
                      </div>

                      <div className="module-list-buttons modules-buttons-right">
                        <button type="button">
                          <FaCheckCircle className="text-success" />
                        </button>
                        <button type="button">
                          <FaEllipsisV className="ms-2 ellipsis-v"></FaEllipsisV>
                        </button>
                      </div>
                    </li>

                    {/* Module Section Lessons */}
                    {section.lessons?.map((lesson, index) => (
                      <li
                        className="module-section-lesson"
                        key={`${module._id}-${lesson.title}-${index}`}
                      >
                        <div>
                          <FaEllipsisV className="ms-2 ellipsis-v ellipsis-left"></FaEllipsisV>
                        </div>
                        <div className="module-item-text">
                          <Link to={lesson.url} className="module-lesson">
                            {lesson.title}
                          </Link>
                        </div>
                        <div className="module-list-buttons modules-buttons-right">
                          <button type="button">
                            <FaCheckCircle className="text-success" />
                          </button>
                          <button type="button">
                            <FaEllipsisV className="ms-2 ellipsis-v"></FaEllipsisV>
                          </button>
                        </div>
                      </li>
                    ))}
                  </div>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ModuleList;
