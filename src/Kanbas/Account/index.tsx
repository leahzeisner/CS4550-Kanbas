import Signin from "../Users/Signin";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../Users/Profile";
import UserTable from "../Users/Table";
import Signup from "../Users/Signup";
import { useEffect } from "react";
import * as client from "../Users/client";

export default function Account() {
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      await client.profile();
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      navigate("/Kanbas/Account/Signin");
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Admin/Users" element={<UserTable />} />
      </Routes>
    </div>
  );
}
