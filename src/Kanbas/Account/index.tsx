import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../Users/Profile";
import UserTable from "../Users/Table";
import Signup from "../Users/Signup";
import { useEffect } from "react";
import * as client from "../Users/client";
import Login from "../Users/Login";
import { useDispatch } from "react-redux";
import { setUser } from "../Users/userReducer";

export default function Account() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      const user = await client.profile();
      dispatch(setUser(user));
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      navigate("/Kanbas/Account/Login");
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Admin/Users" element={<UserTable />} />
      </Routes>
    </div>
  );
}
