import { TodoList } from "../../../types";
import TodoListItem from "./TodoListItem";

interface TodoProps {
  todoList: TodoList | undefined;
}

const Todo = ({ todoList }: TodoProps) => {
  return (
    <div className="todo">
      <p className="course-info-section">To Do</p>
      <hr className="hr-line" />

      <div className="todo-items">
        {todoList?.map((todo, index) => (
          <TodoListItem todo={todo} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Todo;
