import { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowRight,
  FaCheck,
  FaEdit,
  FaPlusCircle,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Module as ModuleType } from "../../types";
import { getFreshId, scrollToElementWithId } from "../../utils";
import { deleteModule, setModulesList, updateModule } from "./modulesReducer";
import * as client from "./client";
import Section from "./Section";
import { useParams } from "react-router";

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
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [editingTitle, setEditingTitle] = useState(module.title === "");
  const [editingTitleText, setEditingTitleText] = useState(module.title);

  useEffect(() => {
    setEditingTitle(module.title === "");
    setEditingTitleText(module.title);
    if (module.title === "") {
      scrollToElementWithId(module._id);
    }
  }, [module.title]);

  const getTitleArrow = (modId: string) => {
    const moduleVisibile = moduleVisibilityMap[modId];

    return moduleVisibile ? (
      <FaArrowDown className="ms-2"></FaArrowDown>
    ) : (
      <FaArrowRight className="ms-2"></FaArrowRight>
    );
  };

  const onEditToggle = () => {
    if (editingTitle) {
      const newModule = { ...module, title: editingTitleText };
      client
        .updateModule(newModule)
        .then(() => dispatch(updateModule(newModule)));
    }
    setEditingTitle(!editingTitle);
  };

  const onDeleteModule = () => {
    client.deleteModule(module._id).then(() => {
      dispatch(deleteModule(module));
    });
  };

  const onAddSection = async () => {
    const emptySection = { _id: getFreshId(), title: "", lessons: [] };
    try {
      await client.createSection(module, emptySection);
      const newModules = await client.findCourseModules(courseId);
      dispatch(setModulesList(newModules));
    } catch (err: any) {
      console.error(err);
    }
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
            {editingTitle ? (
              <textarea
                id={module._id}
                rows={1}
                cols={25}
                className="module-section module-section-textarea"
                value={editingTitleText}
                onChange={(e) => setEditingTitleText(e.target.value)}
                placeholder="Enter Module Title"
                disabled={!editingTitle}
                onBlur={() => onEditToggle()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onEditToggle();
                }}
              ></textarea>
            ) : (
              <span className="module-section">{module.title}</span>
            )}
          </div>

          <div className="module-list-buttons modules-buttons-right">
            <button
              type="button"
              id="add-module-item-btn"
              onClick={onAddSection}
            >
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
              onClick={onDeleteModule}
            >
              <FaX className="ms-2" />
            </button>
          </div>
        </li>

        {/* Module Sections */}
        {moduleVisibilityMap[module._id] &&
          module.sections?.map((section) => (
            <Section module={module} section={section} />
          ))}
      </ul>
    </li>
  );
};

export default Module;
