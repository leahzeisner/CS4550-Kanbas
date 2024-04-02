import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
export default function Signin() {
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

  const clearForm = () => {
    setCredentials({ ...credentials, username: "", password: "" });
  };

  const signin = async () => {
    try {
      const currentUser = await client.signin(credentials);
      if (currentUser !== null) {
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
    <div className="main-content">
      <h1>Signin</h1>
      {error && <div>{error}</div>}
      <input
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button onClick={signin}> Signin </button>
      <button onClick={goToSignup}> Signup </button>
    </div>
  );
}
