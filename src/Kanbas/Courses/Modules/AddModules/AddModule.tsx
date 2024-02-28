import { useState } from "react";
import { useDispatch } from "react-redux";
import { Module } from "../../../types";
import { addModule } from "../modulesReducer";
import AddSection from "./AddSection";

function AddModule({
  setAddingModule,
}: {
  setAddingModule: (addingModule: boolean) => void;
}) {
  const emptyModule = {
    _id: "",
    title: "",
    sections: [],
  };
  const dispatch = useDispatch();
  const [newModule, setNewModule] = useState<Module>(emptyModule);
  const [addingSection, setAddingSection] = useState(false);

  const onSaveModule = () => {
    dispatch(addModule({ ...newModule, _id: new Date().getTime().toString() }));
    setNewModule(emptyModule);
    setAddingModule(false);
  };

  const onCancelModule = () => {
    setNewModule(emptyModule);
    setAddingModule(false);
  };

  const disableSave = () => {
    return newModule.title === "";
  };

  return (
    <div className="add-module">
      <div className="add-module-header">
        <h5>Add Module</h5>
        <input
          type="text"
          value={newModule.title}
          placeholder="Module Title"
          onChange={(e) =>
            setNewModule({ ...newModule, title: e.target.value })
          }
        />
        <button
          type="button"
          className="add-module-btns"
          onClick={() => setAddingSection(!addingSection)}
        >
          {addingSection ? "Hide Sections" : "Add Sections"}
        </button>
      </div>

      {addingSection && (
        <AddSection newModule={newModule} setNewModule={setNewModule} />
      )}

      <div className="add-module-footer-btns">
        <button
          type="button"
          className="add-module-btns"
          onClick={onSaveModule}
          disabled={disableSave()}
        >
          Save
        </button>

        <button
          type="button"
          className="add-module-btns"
          id="module-button"
          onClick={onCancelModule}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddModule;
