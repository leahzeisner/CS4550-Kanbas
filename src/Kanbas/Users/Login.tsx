import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KanbasState } from "../store";
import { User } from "../types";
import * as client from "./client";
import "./index.css";
import { setUser } from "./userReducer";

export default function Login() {
  const user = useSelector((state: KanbasState) => state.userReducer.user);
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

  useEffect(() => {
    if (user) {
      navigate("/Kanbas/Dashboard");
    }
  }, [user]);

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
        placeholder="Username"
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        value={credentials.password}
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
