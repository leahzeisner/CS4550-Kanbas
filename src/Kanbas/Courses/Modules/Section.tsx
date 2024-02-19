import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Section as SectionType } from "../../types";
import SectionItem from "./SectionItem";

interface SectionProps {
  section: SectionType;
}

const Section = ({ section }: SectionProps) => {
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
          <button type="button">
            <FaEllipsisV className="ms-2 ellipsis-v"></FaEllipsisV>
          </button>
        </div>
      </li>

      {/* Module Section Lessons */}
      {section.lessons?.map((lesson) => <SectionItem item={lesson} />)}
    </div>
  );
};

export default Section;
