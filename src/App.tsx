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
  const isDisabled = !title || !description;
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
    <div>
      <div>
        <img
          src="/images/bg-desktop-dark.jpg"
          alt="bg-desktop-dark"
          // srcset=""
        />
      </div>
      <div className="w-[50%] absolute left-[50%] -translate-x-[50%] top-32 text-light-grayish-blue">
        <h1 className="uppercase text-white text-2xl font-bold tracking-widest">
          Task Manager
        </h1>
        <form onSubmit={createTask} className=" flex flex-col gap-4">
          <label
            htmlFor="title"
            className="bg-very-dark-desaturated-blue rounded-md px-2.5 py-2"
          >
            Title
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter title"
              className="w-full bg-transparent outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label
            htmlFor="description"
            className="bg-very-dark-desaturated-blue rounded-md px-2.5 py-2"
          >
            Description
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Enter description"
              className="w-full bg-transparent outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <button
            type="submit"
            disabled={isDisabled}
            className={`${
              isDisabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            Create
          </button>
        </form>
        <div className="rounded-md overflow-hidden">
          {tasks.map((item: Task) => (
            <div
              className=" group flex justify-between bg-very-dark-desaturated-blue border border-very-dark-grayish-blue px-2.5"
              key={item.id}
            >
              <div className="flex items-center gap-3">
                <label className="checkbox border-2 border-very-dark-grayish-blue rounded-full overflow-hidden h-fit cursor-pointer flex items-center justify-center hover:border-2 hover:border-transparent hover:bg-gradient-to-br hover:from-[hsl(192,100%,67%)] hover:to-[hsl(280,87%,65%)] hover:p-[2px]">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={item.status}
                    onChange={(e) => handleStatus(item.id, e.target.checked)}
                  />
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      item.status
                        ? "bg-gradient-to-br from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)]"
                        : "bg-very-dark-desaturated-blue"
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
                    className={`font-bold ${item.status ? "line-through" : ""}`}
                  >
                    {item.title}
                  </h2>
                  <p className={`${item.status ? "line-through" : ""}`}>
                    {item.description}
                  </p>
                </div>
              </div>
              <button
                className="cursor-pointer invisible group-hover:visible"
                onClick={() => deleteTask(item.id)}
              >
                <img src="/images/icon-cross.svg" alt="icon-cross" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
