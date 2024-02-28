import { useState } from "react";
import { FaPlus, FaX } from "react-icons/fa6";
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
      setNewModule({
        ...newModule,
        sections: [...newModule.sections.filter((sec) => sec._id != id)],
      });
      setNewSection({ ...emptySection });
      setId("");
    }

    // Toggle addingSection
    setAddingSection(!addingSection);
  };

  return (
    <div>
      <div className="add-module-section">
        <div className="add-module-section-header">
          <h5>Add Section</h5>
          <button type="button" onClick={onSectionToggle}>
            {addingSection ? (
              <FaX className="ms-2" size={16}></FaX>
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
            />

            <button
              type="button"
              className="add-module-btns"
              onClick={onSaveSection}
            >
              Save Section
            </button>
          </div>
        )}

        {!addingSection && (
          <>
            {newModule.sections.map((section) => (
              <div className="add-module-section">
                <div className="add-section-input">
                  <span>{section.title}</span>
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
