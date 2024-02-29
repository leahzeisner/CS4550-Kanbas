import { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaEllipsisV } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Module, Section, SectionItem as SectionItemType } from "../../types";
import { deleteLesson, updateLesson } from "./modulesReducer";

interface SectionItemProps {
  module: Module;
  section: Section;
  item: SectionItemType;
}

const SectionItem = ({ module, section, item }: SectionItemProps) => {
  const dispatch = useDispatch();
  const [editingTitle, setEditingTitle] = useState(item.title === "");
  const [editingTitleText, setEditingTitleText] = useState(item.title);

  useEffect(() => {
    setEditingTitle(item.title === "");
    setEditingTitleText(item.title);
  }, [item.title]);

  const onEditToggle = () => {
    if (editingTitle) {
      dispatch(
        updateLesson({
          moduleId: module._id,
          sectionId: section._id,
          lesson: { ...item, title: editingTitleText },
        }),
      );
      setEditingTitle(false);
    } else {
      setEditingTitle(true);
    }
  };

  const onDeleteSectionItem = () => {
    dispatch(
      deleteLesson({
        moduleId: module._id,
        sectionId: section._id,
        lesson: item,
      }),
    );
  };

  return (
    <li className="module-section-item" key={item._id}>
      <div>
        <FaEllipsisV className="ms-2 ellipsis-v ellipsis-left"></FaEllipsisV>
      </div>
      <div className="module-item-text">
        {editingTitle ? (
          <textarea
            rows={1}
            cols={25}
            className="module-section-item-link module-section-textarea"
            value={editingTitleText}
            onChange={(e) => setEditingTitleText(e.target.value)}
            placeholder="Enter Lesson Title"
            disabled={!editingTitle}
          ></textarea>
        ) : (
          <Link to={item.url} className="module-section-item-link">
            {item.title}
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
          onClick={onDeleteSectionItem}
        >
          <FaX className="ms-2" />
        </button>
      </div>
    </li>
  );
};

export default SectionItem;
