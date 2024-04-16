import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import "./index.css";
import { setUser } from "./userReducer";

export default function Signup() {
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clearForm = () => {
    setNewUser({ username: "", password: "" });
  };

  const signup = async () => {
    if (!newUser.username || !newUser.password) {
      setError("Username and password required");
      return;
    }

    try {
      const currentUser = await client.signup(newUser);
      if (currentUser !== null) {
        dispatch(setUser(currentUser));
        navigate("/Kanbas/Account/Profile");
      }
    } catch (err: any) {
      clearForm();
      setError(err.response?.data.message);
    }
  };

  const goToLogin = () => {
    navigate("/Kanbas/Account/Login");
  };

  return (
    <div className="main-content user-auth">
      <div className="user-auth-header">
        <h1>Signup</h1>
        <button onClick={goToLogin}> Go to Login </button>
      </div>

      {error && <div className="user-auth-error">{error}</div>}
      <input
        value={newUser.username}
        placeholder="Username"
        onChange={(e) =>
          setNewUser({
            ...newUser,
            username: e.target.value,
          })
        }
      />
      <input
        value={newUser.password}
        placeholder="Password"
        onChange={(e) =>
          setNewUser({
            ...newUser,
            password: e.target.value,
          })
        }
      />

      <button onClick={signup} className="user-auth-btn">
        Signup
      </button>
    </div>
  );
}
