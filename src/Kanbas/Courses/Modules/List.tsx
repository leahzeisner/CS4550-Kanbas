import React, { useState } from "react";
import "./index.css";
import "../../styles.css";
import { modules } from "../../Database";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlusCircle,
  FaArrowDown,
} from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function ModuleList() {
  const { courseId } = useParams();
  const modulesList = modules.filter((module) => module.course === courseId);
  const [selectedModule, setSelectedModule] = useState(modulesList[0]);

  return (
    <div className="modules">
      <div className="module-buttons">
        <button type="button">Collapse All</button>
        <button type="button">View Progress</button>
        <select>
          <option value="PUBLISH-ALL"> Publish All</option>
        </select>
        <button type="button" id="module-button">
          <FaPlusCircle className="plus" />
          Module
        </button>
        <button type="button">
          <FaEllipsisV className="ms-2 ellipsis-v" />
        </button>
      </div>

      <hr className="module-buttons-hr" />

      <ul className="list-group wd-modules">
        {modulesList.map((module) => (
          <li
            className="list-group-item-module"
            onClick={() => setSelectedModule(module)}
          >
            <div className="list-group-title">
              <div>
                <button
                  type="button"
                  className="modules-btn"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${module._id}`}
                  aria-expanded="true"
                  aria-controls={module._id}
                >
                  <FaArrowDown className="ms-2"></FaArrowDown>
                </button>
              </div>

              <span className="module-title">{module.title}</span>

              <div className="float-end">
                <button type="button" className="modules-btn">
                  <FaCheckCircle className="text-success check-circle" />
                </button>
                <button type="button" className="modules-btn">
                  <FaPlusCircle className="ms-2 plus" />
                </button>
                <button type="button" className="modules-btn">
                  <FaEllipsisV className="ms-2 ellipsis-v" />
                </button>
              </div>
            </div>

            {selectedModule._id === module._id &&
              module.sections?.map((section) => (
                <ul className="list-group collapse show" id={module._id}>
                  <li className="list-group-section">
                    <div>
                      <FaEllipsisV className="ms-2 ellipsis-v"></FaEllipsisV>
                    </div>

                    <span className="module-title module-section">
                      {section.title}
                    </span>

                    <div className="float-end">
                      <button type="button" className="modules-btn">
                        <FaCheckCircle className="text-success check-circle" />
                      </button>
                      <button type="button" className="modules-btn">
                        <FaEllipsisV className="ms-2 ellipsis-v"></FaEllipsisV>
                      </button>
                    </div>
                  </li>

                  {section.lessons?.map((lesson) => (
                    <li className="list-group-item">
                      <div>
                        <FaEllipsisV className="ms-2 ellipsis-v"></FaEllipsisV>
                      </div>

                      <div>
                        <Link to={lesson.url} className="list-group-item-text">
                          {lesson.title}
                        </Link>
                      </div>

                      <div className="float-end list-group-item-right">
                        <button type="button" className="modules-btn">
                          <FaCheckCircle className="text-success check-circle" />
                        </button>
                        <button type="button" className="modules-btn">
                          <FaEllipsisV className="ms-2 ellipsis-v"></FaEllipsisV>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ModuleList;