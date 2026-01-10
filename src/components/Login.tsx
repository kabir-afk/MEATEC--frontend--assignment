import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setIsLoggedIn } = useContext(AuthContext);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await axios.post("/api/login", { username, password });
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-[80%] md:w-1/3 absolute left-1/2 -translate-x-1/2 top-32 ">
      <h1 className="text-center uppercase text-white text-2xl font-bold tracking-widest">
        Login
      </h1>
      <form
        className="flex flex-col justify-center items-center gap-2 text-primary"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="user"
          className="w-full bg-task-background rounded-md px-2.5 py-2"
        >
          Username
          <input
            type="text"
            name="user"
            id="user"
            placeholder="JohnDoe"
            className="w-full bg-transparent outline-none placeholder:text-muted"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label
          htmlFor="password"
          className="w-full bg-task-background rounded-md px-2.5 py-2"
        >
          Password
          <input
            type="password"
            name="password"
            id="password"
            className="w-full bg-transparent outline-none placeholder:text-muted"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          className="w-full bg-bright-blue text-white py-2 rounded-md font-semibold"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
