import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Module, Modules, Section as SectionType } from "../../types";
import SectionItem from "./SectionItem";

interface SectionProps {
  module: Module;
  section: SectionType;
  modulesList: Modules;
  setModulesList: (modules: Modules) => void;
}

const Section = ({
  module,
  section,
  modulesList,
  setModulesList,
}: SectionProps) => {
  const onDeleteSection = () => {
    const filteredSections = module.sections.filter(
      (sec) => sec._id != section._id,
    );

    const updatedModules: Modules = [];
    modulesList.map((mod) => {
      updatedModules.push(
        mod === module ? { ...mod, sections: [...filteredSections] } : mod,
      );
    });

    setModulesList([...updatedModules]);
  };

  return (
    <div key={section._id} className="module-section-div">
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
          <button
            type="button"
            id="delete-module-item-btn"
            onClick={onDeleteSection}
          >
            <FaX className="ms-2" />
          </button>
        </div>
      </li>

      {/* Module Section Lessons */}
      {section.lessons?.map((lesson) => (
        <SectionItem
          module={module}
          section={section}
          item={lesson}
          modulesList={modulesList}
          setModulesList={setModulesList}
        />
      ))}
    </div>
  );
};

export default Section;
