import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./components/AuthContext";

interface Task {
  id: number;
  title: string;
  description: string;
  status: boolean;
}
function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);
  async function createTask(e: React.FormEvent) {
    e.preventDefault();
    const response = await axios.post("/api/tasks", {
      title,
      description,
      status: false,
    });
    setTasks(response.data);
    setTitle("");
    setDescription("");
  }
  async function handleStatus(id: number, checked: boolean) {
    const taskTobeUpdated = tasks.find((task) => task.id === id);
    if (!taskTobeUpdated) return;
    const response = await axios.put(`/api/tasks/${id}`, {
      ...taskTobeUpdated,
      status: checked,
    });
    setTasks(response.data);
  }
  async function deleteTask(id: number) {
    const response = await axios.delete(`/api/tasks/${id}`);
    setTasks(response.data);
  }
  async function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }
  return (
    <div className="">
      <form onSubmit={createTask}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
      {tasks.map((item: Task) => (
        <div className="flex" key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <input
            type="checkbox"
            name="status"
            id="status"
            checked={item.status}
            onChange={(e) => handleStatus(item.id, e.target.checked)}
          />
          <button onClick={() => deleteTask(item.id)}>Delete</button>
        </div>
      ))}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
