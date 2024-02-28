import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { TodoItem } from "../../../types";
import { deleteTodoItem } from "./statusReducer";

interface TodoProps {
  todo: TodoItem;
}

const TodoListItem = ({ todo }: TodoProps) => {
  const dispatch = useDispatch();
  const deleteTodo = () => {
    dispatch(deleteTodoItem({ ...todo }));
  };

  return (
    <div className="todo-item" key={todo._id}>
      <div className="todo-item-left">
        <span className="todo-item-num">{todo.number}</span>
        <div className="todo-item-info">
          <Link to={todo.url} className="todo-item-title">
            {todo.title}
          </Link>
          <span className="todo-item-due-date">
            {todo.points} points <span>&#x2022;</span> {todo.due_date}
          </span>
        </div>
      </div>

      <button className="todo-item-delete" type="button" onClick={deleteTodo}>
        <FaTimes></FaTimes>
      </button>
    </div>
  );
};

export default TodoListItem;
