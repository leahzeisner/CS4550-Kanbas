import { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Module, Section as SectionType } from "../../types";
import { getFreshId, scrollToElementWithId } from "../../utils";
import { deleteSection, setModulesList, updateSection } from "./modulesReducer";
import Lesson from "./Lesson";
import * as client from "./client";
import { useParams } from "react-router";

interface SectionProps {
  module: Module;
  section: SectionType;
}

const Section = ({ module, section }: SectionProps) => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [editingTitle, setEditingTitle] = useState(section.title === "");
  const [editingTitleText, setEditingTitleText] = useState(section.title);

  useEffect(() => {
    setEditingTitle(section.title === "");
    setEditingTitleText(section.title);
    if (section.title === "") {
      scrollToElementWithId(section._id);
    }
  }, [section.title]);

  const onEditToggle = () => {
    if (editingTitle) {
      const newSection = { ...section, title: editingTitleText };
      client.updateSection(module, newSection).then(() =>
        dispatch(
          updateSection({
            moduleId: module._id,
            section: newSection,
          }),
        ),
      );
    }
    setEditingTitle(!editingTitle);
  };

  const onDeleteSection = () => {
    client.deleteSection(module, section._id).then(() =>
      dispatch(
        deleteSection({
          moduleId: module._id,
          sectionId: section._id,
        }),
      ),
    );
  };

  const onAddLesson = async () => {
    const emptyLesson = { _id: getFreshId(), title: "", url: "" };
    try {
      await client.createLesson(module, section, emptyLesson);
      const newModules = await client.findCourseModules(courseId);
      dispatch(setModulesList(newModules));
    } catch (err: any) {
      console.error(err);
    }
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
              id={section._id}
              rows={1}
              cols={25}
              className="module-section module-section-textarea"
              value={editingTitleText}
              onChange={(e) => setEditingTitleText(e.target.value)}
              placeholder="Enter Section Title"
              disabled={!editingTitle}
              onBlur={() => onEditToggle()}
              onKeyDown={(e) => {
                if (e.key === "Enter") onEditToggle();
              }}
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
        <Lesson module={module} section={section} lesson={lesson} />
      ))}
    </div>
  );
};

export default Section;
