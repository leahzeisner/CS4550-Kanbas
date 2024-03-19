import axios from "axios";
import { useEffect, useState } from "react";

function WorkingWithArrays() {
  const API = "http://localhost:4000/a5/todos";
  const [errorMessage, setErrorMessage] = useState(null);
  const [todo, setTodo] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  const [todos, setTodos] = useState<
    {
      id: number;
      title: string;
      description: string;
      due: string;
      completed: boolean;
    }[]
  >([]);
  const fetchTodos = async () => {
    const response = await axios.get(API);
    setTodos(response.data);
  };
  // const removeTodo = async (todo: any) => {
  //   const response = await axios.get(`${API}/${todo.id}/delete`);
  //   setTodos(response.data);
  // };
  const deleteTodo = async (todo: any) => {
    try {
      const response = await axios.delete(`${API}/${todo.id}`);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
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

  const postTodo = async () => {
    const response = await axios.post(API, todo);
    setTodos(response.data);
  };

  const updateTodo = async () => {
    try {
      const response = await axios.put(`${API}/${todo.id}`, todo);
      const newTodos = todos.map(
        (t: {
          id: number;
          title: string;
          description: string;
          due: string;
          completed: boolean;
        }) => (t.id === todo.id ? todo : t),
      );
      setTodos(newTodos);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
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

      <textarea
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <input
        value={todo.due}
        type="date"
        onChange={(e) =>
          setTodo({
            ...todo,
            due: e.target.value,
          })
        }
      />
      <label>
        <input
          checked={todo.completed}
          type="checkbox"
          onChange={(e) =>
            setTodo({
              ...todo,
              completed: e.target.checked,
            })
          }
        />
        Completed
      </label>
      <button onClick={postTodo}> Post Todo </button>

      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>
            <button onClick={() => fetchTodoById(todo.id)}>Edit</button>
            {/* <button onClick={() => removeTodo(todo)}>Remove</button> */}
            <button onClick={() => deleteTodo(todo)}>Delete</button>

            {todo.title}
          </li>
        ))}
      </ul>

      <button onClick={createTodo}>Create Todo</button>
      <button onClick={updateTodo}>Update Todo</button>

      {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">{errorMessage}</div>
      )}
    </div>
  );
}
export default WorkingWithArrays;
