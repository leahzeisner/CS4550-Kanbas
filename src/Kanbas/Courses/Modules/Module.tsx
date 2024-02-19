import {
  FaArrowDown,
  FaArrowRight,
  FaCheckCircle,
  FaEllipsisV,
  FaPlusCircle,
} from "react-icons/fa";
import { Module as ModuleType } from "../../types";
import Section from "./Section";

interface ModuleProps {
  module: ModuleType;
  moduleVisibilityMap: Record<string, boolean>;
  toggleModuleVisibility: (modId: string) => void;
}

const Module = ({
  module,
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
            <button type="button">
              <FaEllipsisV className="ms-2 ellipsis-v" />
            </button>
          </div>
        </li>

        {/* Module Sections */}
        {moduleVisibilityMap[module._id] &&
          module.sections?.map((section) => <Section section={section} />)}
      </ul>
    </li>
  );
};

export default Module;
