import { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import {
  Module,
  Section as SectionType,
  SectionItem as Lesson,
} from "../../types";
import { getFreshId } from "../../utils";
import { deleteSection, updateSection } from "./modulesReducer";
import SectionItem from "./SectionItem";

interface SectionProps {
  module: Module;
  section: SectionType;
}

const Section = ({ module, section }: SectionProps) => {
  const dispatch = useDispatch();
  const [editingTitle, setEditingTitle] = useState(section.title === "");
  const [editingTitleText, setEditingTitleText] = useState(section.title);

  useEffect(() => {
    setEditingTitle(section.title === "");
    setEditingTitleText(section.title);
  }, [section.title]);

  const onEditToggle = () => {
    if (editingTitle) {
      dispatch(
        updateSection({
          moduleId: module._id,
          section: { ...section, title: editingTitleText },
        }),
      );
      setEditingTitle(false);
    } else {
      setEditingTitle(true);
    }
  };

  const onDeleteSection = () => {
    dispatch(
      deleteSection({
        moduleId: module._id,
        section,
      }),
    );
  };

  const onAddLesson = () => {
    const emptyLesson: Lesson = { _id: getFreshId(), title: "", url: "" };
    dispatch(
      updateSection({
        moduleId: module._id,
        section: { ...section, lessons: [...section.lessons, emptyLesson] },
      }),
    );
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
              placeholder="Enter Section Title"
              disabled={!editingTitle}
            ></textarea>
          ) : (
            <span className="module-section">{section.title}</span>
          )}
        </div>

        <div className="module-list-buttons modules-buttons-right">
          <button type="button" id="add-module-item-btn" onClick={onAddLesson}>
            <FaPlusCircle className="ms-2"></FaPlusCircle>
          </button>

          <button
            type="button"
            onClick={onEditToggle}
            disabled={editingTitle && editingTitleText === ""}
          >
            {editingTitle ? (
              <FaCheck className="ms-2 text-success" />
            ) : (
              <FaEdit className="ms-2 text-success" />
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
