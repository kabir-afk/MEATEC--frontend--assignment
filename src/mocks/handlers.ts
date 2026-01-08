import { http, HttpResponse } from "msw";

interface Body {
  username: string;
  password: string;
}
export const handlers = [
  //   http.get("/api/users", () => {
  //     return HttpResponse.json([
  //       { id: 1, name: "Alice" },
  //       { id: 2, name: "Bob" },
  //     ]);
  //   }),

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
];
