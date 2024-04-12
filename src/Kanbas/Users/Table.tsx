import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KanbasState } from "../store";
import { User } from "../types";
import { setUser as setUserAction } from "./userReducer";
import * as client from "./client";

export default function UserTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: KanbasState) => state.userReducer.user,
  );
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });
  const [role, setRole] = useState("ALL");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  const fetchUsersByRole = async (role: string) => {
    let users;
    if (role !== "ALL") {
      users = await client.findUsersByRole(role);
    } else {
      users = await client.findAllUsers();
    }

    setRole(role);
    setUsers(users);
  };

  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([...users, newUser]);
      clearForm();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (user: User) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
      if (user._id === currentUser._id) {
        await client.signout();
        dispatch(setUserAction(undefined));
        navigate("/Kanbas/Account/Signup");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const selectUser = async (user: User) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.error(err);
    }
  };

  const updateUser = async () => {
    try {
      const updatingCurrentUser = currentUser && currentUser._id === user._id;
      await client.updateUser(user, updatingCurrentUser);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
      clearForm();
    } catch (err) {
      console.error(err);
    }
  };

  const clearForm = () => {
    setUser({
      _id: "",
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "USER",
    });
  };

  const goToProfile = () => {
    navigate("/Kanbas/Account/Profile");
  };

  return (
    <div className="main-content user-table">
      <div className="user-auth-header">
        <h1>User Table</h1>
        <div className="user-table-hdr">
          <select
            onChange={(e) => fetchUsersByRole(e.target.value)}
            value={role || "ALL"}
            className="user-table-dropdown"
          >
            <option value="ALL">All Users</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button onClick={goToProfile} className="users-link goto-profile">
            Go to Profile
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                value={user.username}
                placeholder="Username"
                className="user-table-inputs"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </td>
            <td>
              <input
                value={user.password}
                placeholder="Password"
                className="user-table-inputs"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </td>
            <td>
              <input
                value={user.firstName}
                placeholder="First Name"
                className="user-table-inputs"
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </td>
            <td>
              <input
                value={user.lastName}
                placeholder="Last Name"
                className="user-table-inputs"
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </td>
            <td>
              <select
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                className="add-user-role user-table-inputs"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>
            </td>
            <td>
              <button className="user-table-btns">
                <FaCheckCircle
                  onClick={updateUser}
                  className="text-success fs-4 update-user-btn"
                />
              </button>
            </td>
            <td>
              <button onClick={createUser} className="user-table-btns">
                <FaPlusCircle className="fs-4" />
              </button>
            </td>
          </tr>

          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>********</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role}</td>
              <td>
                <button
                  onClick={() => deleteUser(user)}
                  className="user-table-btns"
                >
                  <FaTrashCan className="fs-5 text-danger delete-user-btn" />
                </button>
              </td>
              <td>
                <button
                  onClick={() => selectUser(user)}
                  className="user-table-btns"
                >
                  <FaPencil className="fs-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
