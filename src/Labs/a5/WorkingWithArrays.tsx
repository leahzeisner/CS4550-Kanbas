import axios from "axios";
import { useEffect, useState } from "react";

function WorkingWithArrays() {
  const API = "http://localhost:4000/a5/todos";
  const [todo, setTodo] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    const response = await axios.get(API);
    setTodos(response.data);
  };
  const removeTodo = async (todo: any) => {
    const response = await axios.get(`${API}/${todo.id}/delete`);
    setTodos(response.data);
  };
  const createTodo = async () => {
    const response = await axios.get(`${API}/create`);
    setTodos(response.data);
  };

  const fetchTodoById = async (id: number) => {
    const response = await axios.get(`${API}/${id}`);
    setTodo(response.data);
  };

  const updateTitle = async () => {
    const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a href={API}>Get Todos</a>
      <h4>Retrieving an Item from an Array by ID</h4>
      <input
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value) })}
      />
      <a href={`${API}/${todo.id}`}>Get Todo by ID</a>
      <h3>Filtering Array Items</h3>
      <a href={`${API}?completed=true`}>Get Completed Todos</a>
      <h3>Creating new Items in an Array</h3>
      <a href={`${API}/create`}>Create Todo</a>
      <h3>Deleting from an Array</h3>
      <a href={`${API}/${todo.id}/delete`}>Delete Todo with ID = {todo.id}</a>

      <h3>Updating an Item in an Array</h3>
      <input
        type="text"
        value={todo.title}
        onChange={(e) =>
          setTodo({
            ...todo,
            title: e.target.value,
          })
        }
      />
      <a href={`${API}/${todo.id}/title/${todo.title}`}>
        Update Title to {todo.title}
      </a>
      <br />

      <input
        type="text"
        value={todo.description}
        onChange={(e) =>
          setTodo({
            ...todo,
            description: e.target.value,
          })
        }
      />
      <a href={`${API}/${todo.id}/description/${todo.description}`}>
        Update Description to {todo.description}
      </a>

      <br />
      <a href={`${API}/${todo.id}/completed/${todo.completed}`}>
        Update Completed to {todo.completed ? "true" : "false"}
      </a>
      <br />
      <label>Completed</label>
      <input
        type="checkbox"
        onClick={(e) => setTodo({ ...todo, completed: !todo.completed })}
        checked={todo.completed}
      />
      <br />
      <label>Not Completed</label>
      <input
        type="checkbox"
        onClick={(e) => setTodo({ ...todo, completed: !todo.completed })}
        checked={!todo.completed}
      />

      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>
            <button onClick={() => fetchTodoById(todo.id)}>Edit</button>
            <button onClick={() => removeTodo(todo)}>Remove</button>
            {todo.title}
          </li>
        ))}
      </ul>

      <button onClick={createTodo}>Create Todo</button>
      <button onClick={updateTitle}>Update Title</button>
    </div>
  );
}
export default WorkingWithArrays;
