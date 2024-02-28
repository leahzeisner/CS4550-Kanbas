import { useState } from "react";
import { FaMinus, FaPlus, FaX } from "react-icons/fa6";
import { Module, Section } from "../../../types";
import AddLesson from "./AddLessons";

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

  const NEWID = new Date().getTime().toString();
  const [id, setId] = useState(NEWID);
  const [addingSection, setAddingSection] = useState(false);
  const [newSection, setNewSection] = useState<Section>({
    ...emptySection,
    _id: NEWID,
  });

  const onSaveSection = () => {
    setNewModule({
      ...newModule,
      sections: [...newModule.sections, newSection],
    });

    setAddingSection(false);
    const newId = new Date().getTime().toString();
    setId(newId);
    setNewSection({ ...emptySection, _id: newId });
  };

  const onSectionToggle = () => {
    if (addingSection) {
      // Remove section from newModule sections on close
      deleteSection(id);
      setNewSection({ ...emptySection });
      setId("");
    }

    // Toggle addingSection
    setAddingSection(!addingSection);
  };

  const deleteSection = (sectionId: string) => {
    setNewModule({
      ...newModule,
      sections: [...newModule.sections.filter((sec) => sec._id != sectionId)],
    });
  };

  return (
    <div>
      <div className="add-module-section">
        <div className="add-module-section-header">
          <h5>Add Section</h5>
          <button type="button" onClick={onSectionToggle}>
            {addingSection ? (
              <FaMinus className="ms-2" size={18}></FaMinus>
            ) : (
              <FaPlus className="ms-2" size={18}></FaPlus>
            )}
          </button>
        </div>

        {addingSection && (
          <div>
            <div className="add-section-input">
              <input
                type="text"
                value={newSection.title}
                placeholder="Section Title"
                onChange={(e) =>
                  setNewSection({ ...newSection, title: e.target.value })
                }
              />
            </div>

            <AddLesson
              newModule={newModule}
              setNewSection={setNewSection}
              setNewModule={setNewModule}
              newSection={newSection}
              onSaveSection={onSaveSection}
            />
          </div>
        )}

        {!addingSection && (
          <>
            {newModule.sections.map((section) => (
              <div className="add-module-section">
                <div className="section-list">
                  <span>{section.title}</span>
                  <button
                    type="button"
                    className="delete-lesson-btn"
                    onClick={() => deleteSection(section._id)}
                  >
                    <FaX className="ms-2" size={12}></FaX>
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default AddSection;
