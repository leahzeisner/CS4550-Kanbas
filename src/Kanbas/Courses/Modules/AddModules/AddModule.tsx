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

  const onSaveModule = () => {
    dispatch(addModule({ ...newModule, _id: new Date().getTime().toString() }));
    setNewModule(emptyModule);
    setAddingModule(false);
  };

  const onCancelModule = () => {
    setNewModule(emptyModule);
    setAddingModule(false);
  };

  return (
    <div className="add-module">
      <div className="add-module-header">
        <h4>Create Module:</h4>
        <input
          type="text"
          value={newModule.title}
          placeholder="Module Title"
          onChange={(e) =>
            setNewModule({ ...newModule, title: e.target.value })
          }
        />
      </div>

      <AddSection newModule={newModule} setNewModule={setNewModule} />

      <div className="add-module-footer-btns">
        <button
          type="button"
          className="add-module-btns"
          id="module-button"
          onClick={onCancelModule}
        >
          Cancel
        </button>
        <button
          type="button"
          className="add-module-btns"
          onClick={onSaveModule}
        >
          Save
        </button>
      </div>

      <hr className="module-buttons-hr" />
    </div>
  );
}

export default AddModule;
