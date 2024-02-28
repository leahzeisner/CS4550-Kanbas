import { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaEllipsisV } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Module,
  Section,
  SectionItem as SectionItemType,
  SectionItems,
  Sections,
} from "../../types";
import { updateModule } from "./modulesReducer";

interface SectionItemProps {
  module: Module;
  section: Section;
  item: SectionItemType;
}

const SectionItem = ({ module, section, item }: SectionItemProps) => {
  const dispatch = useDispatch();
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingTitleText, setEditingTitleText] = useState(item.title);

  useEffect(() => {
    setEditingTitleText(item.title);
  }, [item]);

  const onEditToggle = () => {
    if (editingTitle) {
      saveEdit();
      setEditingTitle(false);
    } else {
      setEditingTitle(true);
    }
  };

  const updateSection = (updatedSectionItems: SectionItems) => {
    const updatedSections: Sections = [];
    module.sections.map((sec) => {
      updatedSections.push(
        sec === section
          ? { ...section, lessons: [...updatedSectionItems] }
          : sec,
      );
    });
    return updatedSections;
  };

  const saveEdit = () => {
    const updatedSectionItems: SectionItems = [];
    section.lessons.map((itm) => {
      updatedSectionItems.push(
        itm === item ? { ...itm, title: editingTitleText } : itm,
      );
    });

    const updatedSections = updateSection(updatedSectionItems);
    dispatch(updateModule({ ...module, sections: [...updatedSections] }));
  };

  const onDeleteSectionItem = () => {
    const filteredSectionItems = section.lessons.filter(
      (itm) => itm._id != item._id,
    );

    const updatedSections = updateSection(filteredSectionItems);
    dispatch(updateModule({ ...module, sections: [...updatedSections] }));
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
