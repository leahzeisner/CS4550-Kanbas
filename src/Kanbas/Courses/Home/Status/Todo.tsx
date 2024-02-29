import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { KanbasState } from "../../../store";
import { TodoList } from "../../../types";
import TodoListItem from "./TodoListItem";

const Todo = () => {
  const { courseId } = useParams();
  const todoList: TodoList = useSelector(
    (state: KanbasState) => state.statusReducer.todoList,
  );
  const [courseTodos] = useState<TodoList>(
    todoList.filter((todo) => todo.courseId === courseId),
  );

  return (
    <div className="todo">
      <p className="course-info-section">To Do</p>
      <hr className="hr-line" />

      <div className="todo-items">
        {courseTodos.length > 0 ? (
          courseTodos.map((todo) => <TodoListItem todo={todo} />)
        ) : (
          <span className="todo-item nothing-todo">Nothing todo!</span>
        )}
      </div>
    </div>
  );
};

export default Todo;
