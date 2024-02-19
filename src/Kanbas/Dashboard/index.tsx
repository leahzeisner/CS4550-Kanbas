import { FaEllipsisV } from "react-icons/fa";
import { courses } from "../Database";
import Course from "./Course";
import "./index.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dash-header">
        <h1 id="dash-title">Dashboard</h1>
        <button type="button" className="dash-icon-button">
          <FaEllipsisV size={28} className="dash-icon"></FaEllipsisV>
        </button>
        <hr style={{ margin: "8px 0px 16px 0px" }} />
      </div>

      <div className="published-courses">
        <h2>Published Courses ({courses.length})</h2>
        <hr style={{ marginBottom: "30px" }} />

        <div className="d-flex flex-wrap">
          {courses.map((course) => (
            <Course course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
