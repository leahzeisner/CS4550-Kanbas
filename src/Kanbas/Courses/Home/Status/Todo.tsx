import { TodoList } from "../../../types";
import TodoListItem from "./TodoListItem";

interface TodoProps {
  todoList: TodoList;
}

const Todo = ({ todoList }: TodoProps) => {
  return (
    <div className="todo">
      <p className="course-info-section">To Do</p>
      <hr className="hr-line" />

      <div className="todo-items">
        {todoList.map((todo) => (
          <TodoListItem todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default Todo;
