import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TodoItem } from "../../../types";

interface TodoProps {
  todo: TodoItem;
  index: number;
}

const TodoListItem = ({ todo, index }: TodoProps) => {
  return (
    <div className="todo-item" key={`${todo.title}-${index}`}>
      <div className="todo-item-left">
        <span className="todo-item-num">{index + 1}</span>
        <div className="todo-item-info">
          <Link to={todo.url} className="todo-item-title">
            {todo.title}
          </Link>
          <span className="todo-item-due-date">
            {todo.points} points <span>&#x2022;</span> {todo.due_date}
          </span>
        </div>
      </div>

      <button className="todo-item-delete" type="button">
        <FaTimes></FaTimes>
      </button>
    </div>
  );
};

export default TodoListItem;
