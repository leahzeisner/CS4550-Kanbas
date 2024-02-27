import ModuleList from "./ModuleList";
import "../../styles.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { modules } from "../../Database";
import { Modules as ModulesList } from "../../types";

function Modules() {
  const { courseId } = useParams();
  const [modulesList, setModulesList] = useState<ModulesList>([]);

  useEffect(() => {
    const classModules = modules.filter((module) => module._id === courseId);

    if (classModules.length > 0) {
      setModulesList(classModules[0].modules);
    }
  }, []);

  return (
    <div className="main-content">
      <ModuleList modulesList={modulesList} setModulesList={setModulesList} />
    </div>
  );
}
export default Modules;
