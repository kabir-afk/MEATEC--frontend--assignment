import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Login from "../src/components/Login.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import PublicRoute from "./components/PublicRoute.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import { AuthProvider } from "./components/AuthContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
  },
]);

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}
enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  );
});
