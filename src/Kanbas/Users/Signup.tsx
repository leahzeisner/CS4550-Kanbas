import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const clearForm = () => {
    setUser({ username: "", password: "" });
  };

  const signup = async () => {
    try {
      await client.signup(user);
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      clearForm();
      setError(err.response?.data.message);
    }
  };

  const goToSignin = () => {
    navigate("/Kanbas/Account/Signin");
  };

  return (
    <div className="main-content">
      <h1>Signup</h1>
      {error && <div>{error}</div>}
      <input
        value={user.username}
        onChange={(e) =>
          setUser({
            ...user,
            username: e.target.value,
          })
        }
      />
      <input
        value={user.password}
        onChange={(e) =>
          setUser({
            ...user,
            password: e.target.value,
          })
        }
      />
      <button onClick={signup}> Signup </button>
      <button onClick={goToSignin}> Signin </button>
    </div>
  );
}
