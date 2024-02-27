import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  Module,
  Modules,
  Section,
  SectionItem as SectionItemType,
  Sections,
} from "../../types";

interface SectionItemProps {
  module: Module;
  section: Section;
  item: SectionItemType;
  modulesList: Modules;
  setModulesList: (modules: Modules) => void;
}

const SectionItem = ({
  module,
  section,
  item,
  modulesList,
  setModulesList,
}: SectionItemProps) => {
  const onDeleteSectionItem = () => {
    const filteredSectionItems = section.lessons.filter(
      (itm) => itm._id != item._id,
    );

    const updatedSections: Sections = [];
    module.sections.map((sec) => {
      updatedSections.push(
        sec === section
          ? { ...section, lessons: [...filteredSectionItems] }
          : sec,
      );
    });

    const updatedModules: Modules = [];
    modulesList.map((mod) => {
      updatedModules.push(
        mod === module ? { ...mod, sections: [...updatedSections] } : mod,
      );
    });
    setModulesList([...updatedModules]);
  };

  return (
    <li className="module-section-item" key={item._id}>
      <div>
        <FaEllipsisV className="ms-2 ellipsis-v ellipsis-left"></FaEllipsisV>
      </div>
      <div className="module-item-text">
        <Link to={item.url} className="module-section-item-link">
          {item.title}
        </Link>
      </div>
      <div className="module-list-buttons modules-buttons-right">
        <button type="button">
          <FaCheckCircle className="text-success" />
        </button>
        <button
          type="button"
          id="delete-module-item-btn"
          onClick={onDeleteSectionItem}
        >
          <FaX className="ms-2" />
        </button>
      </div>
    </li>
  );
};

export default SectionItem;
