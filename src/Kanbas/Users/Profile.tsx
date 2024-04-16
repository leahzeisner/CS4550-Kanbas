import * as client from "./client";
import _ from "lodash";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./userReducer";
import "./index.css";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
  });
  const [lastSavedUser, setLastSavedUser] = useState(undefined);
  const [error, setError] = useState("");

  const fixDob = (profile: any) => {
    return !profile.dob
      ? profile
      : { ...profile, dob: profile.dob.substring(0, 10) };
  };

  const fetchProfile = async () => {
    try {
      const account = await client.profile();
      setProfile(fixDob(account));
      setLastSavedUser(account);
    } catch (err: any) {
      console.error("Failed to fetch profile: ", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const save = async () => {
    const oldProfile = profile;
    try {
      await client.updateUser(profile, true);
      const user = await client.profile();
      setLastSavedUser(fixDob(user));
      setError("");
    } catch (err: any) {
      setError("Failed to update profile");
      setProfile(oldProfile);
    }
  };

  const signout = async () => {
    await client.signout();
    dispatch(setUser(undefined));
    navigate("/Kanbas/Account/Login");
  };

  const profileSaved = () => {
    return _.isEqual(profile, lastSavedUser);
  };

  return (
    <div className="main-content user-auth profile">
      <div className="user-auth-header">
        <h1>Profile</h1>
        <button onClick={signout}>Signout</button>
      </div>

      {profile && (
        <div className="profile-info">
          <div className="profile-item">
            <label>Username:</label>
            <input
              value={profile.username}
              placeholder="Username"
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
          </div>
          <div className="profile-item">
            <label>Password:</label>
            <input
              value={profile.password}
              placeholder="Password"
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
            />
          </div>
          <div className="profile-item">
            <label>First Name:</label>
            <input
              value={profile.firstName}
              placeholder="First Name"
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />
          </div>
          <div className="profile-item">
            <label>Last Name:</label>
            <input
              value={profile.lastName}
              placeholder="Last Name"
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />
          </div>
          <div className="profile-item">
            <label>Date of Birth:</label>
            <input
              value={profile.dob}
              type="date"
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
          </div>
          <div className="profile-item">
            <label>Email:</label>
            <input
              value={profile.email}
              placeholder="Email"
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </div>
          <div className="profile-item">
            <label>Role:</label>
            <select
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>

          {error && <div className="user-auth-error">{error}</div>}

          <div className="profile-footer">
            <Link to="/Kanbas/Account/Admin/Users" className="users-link">
              Go to Users
            </Link>
            <div>
              <button
                onClick={save}
                className="user-auth-btn"
                disabled={profileSaved()}
              >
                {profileSaved() ? "Saved" : "Save"}
              </button>
              <button
                onClick={() => fetchProfile()}
                className="user-auth-btn"
                id="discard-profile-changes-btn"
                disabled={profileSaved()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
