import { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaEllipsisV } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Module, Section, Lesson as LessonType } from "../../types";
import { scrollToElementWithId } from "../../utils";
import { deleteLesson, updateLesson } from "./modulesReducer";
import * as client from "./client";

interface LessonProps {
  module: Module;
  section: Section;
  lesson: LessonType;
}

const Lesson = ({ module, section, lesson }: LessonProps) => {
  const dispatch = useDispatch();
  const [editingTitle, setEditingTitle] = useState(lesson.title === "");
  const [editingTitleText, setEditingTitleText] = useState(lesson.title);

  useEffect(() => {
    setEditingTitle(lesson.title === "");
    setEditingTitleText(lesson.title);
    if (lesson.title === "") {
      scrollToElementWithId(lesson._id);
    }
  }, [lesson.title]);

  const onEditToggle = () => {
    if (editingTitle) {
      const newLesson = { ...lesson, title: editingTitleText };
      client.updateLesson(module._id, section._id, newLesson).then(() =>
        dispatch(
          updateLesson({
            moduleId: module._id,
            sectionId: section._id,
            lesson: { ...lesson, title: editingTitleText },
          }),
        ),
      );
    }
    setEditingTitle(!editingTitle);
  };

  const onDeleteLesson = () => {
    client.deleteLesson(module._id, section._id, lesson).then(() =>
      dispatch(
        deleteLesson({
          moduleId: module._id,
          sectionId: section._id,
          lesson: lesson,
        }),
      ),
    );
  };

  return (
    <li className="module-section-item" key={lesson._id}>
      <div>
        <FaEllipsisV className="ms-2 ellipsis-v ellipsis-left"></FaEllipsisV>
      </div>
      <div className="module-item-text">
        {editingTitle ? (
          <textarea
            id={lesson._id}
            rows={1}
            cols={25}
            className="module-section-item-link module-section-textarea"
            value={editingTitleText}
            onChange={(e) => setEditingTitleText(e.target.value)}
            onBlur={() => onEditToggle()}
            placeholder="Enter Lesson Title"
            disabled={!editingTitle}
          ></textarea>
        ) : (
          <Link to={lesson.url} className="module-section-item-link">
            {lesson.title}
          </Link>
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
          onClick={onDeleteLesson}
        >
          <FaX className="ms-2" />
        </button>
      </div>
    </li>
  );
};

export default Lesson;
