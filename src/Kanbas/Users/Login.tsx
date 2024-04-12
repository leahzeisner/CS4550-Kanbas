import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User } from "../types";
import * as client from "./client";
import "./index.css";
import { setUser } from "./userReducer";

export default function Login() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clearForm = () => {
    setCredentials({ ...credentials, username: "", password: "" });
  };

  const login = async () => {
    try {
      const currentUser = await client.login(credentials);
      if (currentUser !== null) {
        dispatch(setUser(currentUser));
        navigate("/Kanbas/Account/Profile");
      }
    } catch (err: any) {
      clearForm();
      setError(err.response?.data.message);
    }
  };

  const goToSignup = () => {
    navigate("/Kanbas/Account/Signup");
  };

  return (
    <div className="main-content user-auth">
      <div className="user-auth-header">
        <h1>Login</h1>
        <button onClick={goToSignup}> Go to Signup </button>
      </div>

      {error && <div className="user-auth-error">{error}</div>}
      <input
        value={credentials.username}
        className="user-auth-user-input"
        placeholder="Username"
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        value={credentials.password}
        className="user-auth-pass-input"
        placeholder="Password"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button onClick={login} className="user-auth-btn">
        Login
      </button>
    </div>
  );
}
