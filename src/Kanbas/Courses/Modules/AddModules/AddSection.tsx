import { useState } from "react";
import { Module, Section } from "../../../types";
import AddLesson from "./AddLesson";

function AddSection({
  newModule,
  setNewModule,
}: {
  newModule: Module;
  setNewModule: (newMod: Module) => void;
}) {
  const emptySection = {
    _id: "",
    title: "",
    lessons: [],
  };
  const [newSection, setNewSection] = useState<Section>(emptySection);
  const [addingLessonToSectionMap, setAddingLessonToSectionMap] = useState<
    Record<string, boolean>
  >({});

  const initAddLessonVisibility = (sectionId: string) => {
    const mapCopy = addingLessonToSectionMap;
    mapCopy[sectionId] = false;
    setAddingLessonToSectionMap(mapCopy);
  };

  const onAddSection = () => {
    const newId = new Date().getTime().toString();
    setNewModule({
      ...newModule,
      sections: [...newModule.sections, { ...newSection, _id: newId }],
    });
    setNewSection(emptySection);
    initAddLessonVisibility(newId);
  };

  const onDeleteSection = (sectionId: string) => {
    setNewModule({
      ...newModule,
      sections: newModule.sections.filter((sec) => sec._id != sectionId),
    });
  };

  const onAddLesson = (sectionId: string) => {
    setAddingLessonToSectionMap((prevState: Record<string, boolean>) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  return (
    <div>
      <div className="add-module-section">
        <h5>Add Sections</h5>

        <div className="add-section-input">
          <input
            type="text"
            value={newSection.title}
            placeholder="Section Title"
            onChange={(e) =>
              setNewSection({ ...newSection, title: e.target.value })
            }
          />
          <button
            type="button"
            className="add-module-btns"
            onClick={onAddSection}
            disabled={newSection.title === ""}
          >
            Add
          </button>
        </div>

        {newModule.sections.map((section) => (
          <div>
            <div>
              <span>{section.title}</span>
              <button
                type="button"
                className="add-module-btns"
                onClick={() => onAddLesson(section._id)}
              >
                {addingLessonToSectionMap[section._id]
                  ? "Hide Lessons"
                  : "Add Lessons"}
              </button>
              <button
                type="button"
                className="add-module-btns"
                onClick={() => onDeleteSection(section._id)}
              >
                Delete
              </button>
            </div>

            {addingLessonToSectionMap[section._id] && (
              <AddLesson
                newModule={newModule}
                setNewModule={setNewModule}
                section={section}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddSection;
