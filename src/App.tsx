import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useTheme from "./hooks/useTheme";
import { AuthContext } from "./components/AuthContext";
import { Filter } from "./components/Filter";

interface Task {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const isDisabled = !title || !description;
  const { setIsLoggedIn } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();

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
  const handleFilter = (filterValue: string) => {
    setActiveTab(filterValue);
  };
  return (
    <div>
      <div className="w-[90%] md:w-1/2 absolute left-1/2 -translate-x-1/2 top-32 text-primary">
        <div className="flex gap-2 items-center mb-2">
          <h1 className="uppercase text-white text-2xl font-bold tracking-widest flex-1">
            Task Manager
          </h1>
          <button onClick={toggleTheme} className="cursor-pointer">
            {theme === "light" ? (
              <img src="/images/icon-moon.svg" alt="icon-moon" />
            ) : (
              <img src="/images/icon-sun.svg" alt="icon-sun" />
            )}
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-task-background rounded-md hover:bg-border transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
        <Filter setFilter={handleFilter} />

        <form onSubmit={createTask} className="flex flex-col gap-4 mb-6">
          <label
            htmlFor="title"
            className="bg-task-background rounded-md px-2.5 py-2"
          >
            Task title
            <input
              type="text"
              name="title"
              id="title"
              placeholder="What needs to be done ?"
              className="w-full bg-transparent outline-none placeholder:text-muted"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label
            htmlFor="description"
            className="bg-task-background rounded-md px-2.5 py-2"
          >
            Description
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Add some details . . ."
              className="w-full bg-transparent outline-none placeholder:text-muted"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <button
            type="submit"
            disabled={isDisabled}
            className={`bg-bright-blue text-white py-2 rounded-md font-semibold ${
              isDisabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:opacity-80"
            }`}
          >
            Create
          </button>
        </form>

        <div className="rounded-md overflow-hidden shadow-lg">
          {tasks
            .filter((task) => {
              if (activeTab === "All") return task;
              else if (activeTab === "Completed") return task.status;
              else if (activeTab === "Active") return !task.status;
            })
            .map((item: Task) => (
              <div
                className="group flex justify-between bg-task-background border-b border-border px-2.5 py-4"
                key={item.id}
              >
                <div className="flex items-center gap-3">
                  <label className="checkbox border-2 border-border rounded-full overflow-hidden h-fit cursor-pointer flex items-center justify-center hover:border-2 hover:border-transparent hover:bg-linear-to-br hover:from-[hsl(192,100%,67%)] hover:to-[hsl(280,87%,65%)]">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={item.status}
                      onChange={(e) => handleStatus(item.id, e.target.checked)}
                    />
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        item.status
                          ? "bg-linear-to-br from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)]"
                          : "bg-task-background"
                      }`}
                    >
                      <img
                        src="/images/icon-check.svg"
                        alt="icon-check"
                        className={item.status ? "visible" : "invisible"}
                      />
                    </span>
                  </label>
                  <div className="flex flex-col">
                    <h2
                      className={`font-bold ${
                        item.status ? "line-through text-muted" : ""
                      }`}
                    >
                      {item.title}
                    </h2>
                    <p
                      className={`text-muted ${
                        item.status ? "line-through" : ""
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
                <button
                  className="cursor-pointer invisible group-hover:visible hover:scale-110 transition-transform"
                  onClick={() => deleteTask(item.id)}
                >
                  <img src="/images/icon-cross.svg" alt="icon-cross" />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
