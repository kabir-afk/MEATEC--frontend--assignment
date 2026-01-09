import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./components/AuthContext";

function App() {
  interface task {
    id: number;
    title: string;
    description: string;
    status: boolean;
  }
  const [tasks, setTasks] = useState<task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
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
    const updatedTasks = [
      ...tasks,
      { id: Date.now(), title, description, status: false },
    ];
    setTasks(updatedTasks);

    const response = await axios.post("/api/tasks", {
      id: Date.now(),
      title,
      description,
      status: false,
    });
    console.log(response.data);
  }
  async function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }
  return (
    <div className="">
      hello world
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
      {tasks.map((item: task) => (
        <div className="flex" key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
