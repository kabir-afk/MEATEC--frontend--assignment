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
      localStorage.setItem(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
      );
      return HttpResponse.json({ message: "user created" }, { status: 200 });
    }

    return HttpResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }),
];
