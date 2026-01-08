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
type Tasks = task[];

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
    const newTasks = (await request.json()) as Tasks;

    localStorage.setItem("tasks", JSON.stringify(newTasks));
    return HttpResponse.json({ message: "task created" }, { status: 200 });
  }),
];
