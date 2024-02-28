import { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaEllipsisV } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Module, Section as SectionType, Sections } from "../../types";
import { updateModule } from "./modulesReducer";
import SectionItem from "./SectionItem";

interface SectionProps {
  module: Module;
  section: SectionType;
}

const Section = ({ module, section }: SectionProps) => {
  const dispatch = useDispatch();
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingTitleText, setEditingTitleText] = useState(section.title);

  useEffect(() => {
    setEditingTitleText(section.title);
  }, [section]);

  const onEditToggle = () => {
    if (editingTitle) {
      saveEdit();
      setEditingTitle(false);
    } else {
      setEditingTitle(true);
    }
  };

  const saveEdit = () => {
    const updatedSections: Sections = [];
    module.sections.map((sec) => {
      updatedSections.push(
        sec === section ? { ...sec, title: editingTitleText } : sec,
      );
    });
    dispatch(updateModule({ ...module, sections: [...updatedSections] }));
  };

  const onDeleteSection = () => {
    const filteredSections = module.sections.filter(
      (sec) => sec._id != section._id,
    );
    dispatch(updateModule({ ...module, sections: [...filteredSections] }));
  };

  return (
    <div key={section._id} className="module-section-div">
      <li className="module-section-title">
        <div>
          <FaEllipsisV className="ms-2 ellipsis-v ellipsis-left"></FaEllipsisV>
        </div>

        <div className="module-title-text">
          {editingTitle ? (
            <textarea
              rows={1}
              cols={25}
              className="module-section module-section-textarea"
              value={editingTitleText}
              onChange={(e) => setEditingTitleText(e.target.value)}
              disabled={!editingTitle}
            ></textarea>
          ) : (
            <span className="module-section">{section.title}</span>
          )}
        </div>

        <div className="module-list-buttons modules-buttons-right">
          <button
            type="button"
            onClick={onEditToggle}
            disabled={editingTitle && editingTitleText === ""}
          >
            {editingTitle ? (
              <FaCheck className="text-success" />
            ) : (
              <FaEdit className="text-success" />
            )}
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
        <SectionItem module={module} section={section} item={lesson} />
      ))}
    </div>
  );
};

export default Section;
