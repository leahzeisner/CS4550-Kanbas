import {
  FaArrowDown,
  FaArrowRight,
  FaCheckCircle,
  FaPlusCircle,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Module as ModuleType, Modules } from "../../types";
import Section from "./Section";

interface ModuleProps {
  module: ModuleType;
  modulesList: Modules;
  setModulesList: (modules: Modules) => void;
  moduleVisibilityMap: Record<string, boolean>;
  toggleModuleVisibility: (modId: string) => void;
}

const Module = ({
  module,
  modulesList,
  setModulesList,
  moduleVisibilityMap,
  toggleModuleVisibility,
}: ModuleProps) => {
  // Renders arrow icon based on module visibility
  const getTitleArrow = (modId: string) => {
    const moduleVisibile = moduleVisibilityMap[modId];

    return moduleVisibile ? (
      <FaArrowDown className="ms-2"></FaArrowDown>
    ) : (
      <FaArrowRight className="ms-2"></FaArrowRight>
    );
  };

  const onDeleteModule = () => {
    setModulesList(modulesList.filter((mod) => mod._id != module._id));
  };

  return (
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

            <button
              type="button"
              id="delete-module-item-btn"
              onClick={onDeleteModule}
            >
              <FaX className="ms-2" />
            </button>
          </div>
        </li>

        {/* Module Sections */}
        {moduleVisibilityMap[module._id] &&
          module.sections?.map((section) => (
            <Section
              module={module}
              section={section}
              modulesList={modulesList}
              setModulesList={setModulesList}
            />
          ))}
      </ul>
    </li>
  );
};

export default Module;
