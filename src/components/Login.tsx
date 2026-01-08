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
      const response = await axios.post("/api/login", { username, password });
      console.log(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user">Username</label>
        <input
          type="text"
          name="user"
          id="user"
          placeholder="JohnDoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
