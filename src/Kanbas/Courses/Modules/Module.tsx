import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowRight, FaCheck, FaEdit } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Module as ModuleType } from "../../types";
import { deleteModule, updateModule } from "./modulesReducer";
import Section from "./Section";

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

  const [editingTitle, setEditingTitle] = useState(false);
  const [editingTitleText, setEditingTitleText] = useState(module.title);

  useEffect(() => {
    setEditingTitleText(module.title);
  }, [module]);

  // Renders arrow icon based on module visibility
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
      saveEdit();
      setEditingTitle(false);
    } else {
      setEditingTitle(true);
    }
  };

  const saveEdit = () => {
    dispatch(updateModule({ ...module, title: editingTitleText }));
  };

  const onDeleteModule = () => {
    dispatch(deleteModule({ ...module }));
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
                rows={1}
                cols={25}
                className="module-section module-section-textarea"
                value={editingTitleText}
                onChange={(e) => setEditingTitleText(e.target.value)}
                disabled={!editingTitle}
              ></textarea>
            ) : (
              <span className="module-section">{editingTitleText}</span>
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
