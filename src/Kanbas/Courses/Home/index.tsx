import ModuleList from "../Modules/ModuleList";
import Status from "./Status/Status";
import "../../styles.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { comingUpItems, modules, todos } from "../../Database";
import { TodoList, ComingUpList, Modules } from "../../types";

function Home() {
  const { courseId } = useParams();
  const [modulesList, setModulesList] = useState<Modules>([]);
  const [todoList, setTodoList] = useState<TodoList>([]);
  const [comingUpList, setComingUpList] = useState<ComingUpList>([]);

  useEffect(() => {
    // Modules
    const classModules = modules.filter((module) => module._id === courseId);

    if (classModules.length > 0) {
      setModulesList(classModules[0].modules);
    }

    // Todos
    const classTodos = todos.filter((todo) => todo._id === courseId);
    if (classTodos.length > 0) {
      setTodoList(classTodos[0].todos);
    }

    // Coming Up Items
    const classComingUps = comingUpItems.filter(
      (item) => item._id === courseId,
    );
    if (classComingUps.length > 0) {
      setComingUpList(classComingUps[0].items);
    }
  }, []);

  return (
    <div className="main-content">
      <ModuleList modulesList={modulesList} setModulesList={setModulesList} />
      <Status
        todoList={todoList}
        setTodoList={setTodoList}
        comingUpList={comingUpList}
        setComingUpList={setComingUpList}
      />
    </div>
  );
}
export default Home;
