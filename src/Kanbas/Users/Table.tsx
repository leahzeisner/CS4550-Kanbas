import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaPlusCircle, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import * as client from "./client";
import { User } from "./client";
export default function UserTable() {
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
      console.log(err);
    }
  };

  const deleteUser = async (user: User) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };

  const selectUser = async (user: User) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };

  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
      clearForm();
    } catch (err) {
      console.log(err);
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

  return (
    <div className="main-content">
      <select
        onChange={(e) => fetchUsersByRole(e.target.value)}
        value={role || "ALL"}
        className="form-control w-25 float-end"
      >
        <option value="ALL">All</option>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>

      <h1>User Table</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </td>
            <td>
              <input
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </td>
            <td>
              <input
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </td>
            <td>
              <select
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>
            </td>
            <td>
              <FaCheckCircle
                onClick={updateUser}
                className="me-2 text-success fs-1 text"
              />
            </td>
            <td>
              <button onClick={createUser}>
                <FaPlusCircle />
              </button>
            </td>
          </tr>

          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => deleteUser(user)}>
                  <FaTrash />
                </button>
              </td>
              <td>
                <button onClick={() => selectUser(user)}>
                  <FaPencil />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
