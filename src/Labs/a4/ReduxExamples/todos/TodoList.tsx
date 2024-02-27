import React from "react";
import { useSelector } from "react-redux";
import { LabState, TodoType } from "../../../store";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

function TodoList() {
  const { todos } = useSelector((state: LabState) => state.todosReducer);
  return (
    <div>
      <h2>Todo List</h2>
      <ul className="list-group">
        <TodoForm />
        {todos.map((todo: TodoType) => (
          <TodoItem todo={todo} />
        ))}
      </ul>
    </div>
  );
}
export default TodoList;
