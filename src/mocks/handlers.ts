import { http, HttpResponse } from "msw";

interface Body {
  username: string;
  password: string;
}

interface task {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const body = (await request.json()) as Body;

    if (body.username === "test" && body.password === "test123") {
      localStorage.setItem("token", "734f8h398f30f9j30f");
      return HttpResponse.json({ message: "user created" }, { status: 200 });
    }

    return HttpResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }),

  http.get("/api/tasks", () => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      return HttpResponse.json(JSON.parse(tasks));
    }
    return HttpResponse.json([]);
  }),
  http.post("/api/tasks", async ({ request }) => {
    const newTask = (await request.json()) as task;
    const oldTasksString = localStorage.getItem("tasks");
    const oldTasks: task[] = oldTasksString ? JSON.parse(oldTasksString) : [];

    localStorage.setItem("tasks", JSON.stringify([...oldTasks, newTask]));
    return HttpResponse.json({ message: "task created" }, { status: 200 });
  }),
  http.put("/api/tasks/:id", async ({ request, params }) => {
    const { id } = params;
    const newTask = (await request.json()) as task;
    const oldTasksString = localStorage.getItem("tasks");
    const oldTasks: task[] = oldTasksString ? JSON.parse(oldTasksString) : [];
    const updatedTasks = oldTasks.map((task) =>
      task.id === Number(id) ? { ...task, ...newTask } : task
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    return HttpResponse.json({ message: "task updated" }, { status: 200 });
  }),
  http.delete("/api/tasks/:id", async ({ params }) => {
    const { id } = params;
    const oldTasksString = localStorage.getItem("tasks");
    const oldTasks: task[] = oldTasksString ? JSON.parse(oldTasksString) : [];
    const updatedTasks = oldTasks.filter((task) => task.id !== Number(id));

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    return HttpResponse.json({ message: "task updated" }, { status: 200 });
  }),
];
