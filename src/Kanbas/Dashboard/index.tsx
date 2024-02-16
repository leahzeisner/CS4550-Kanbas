import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import { courses } from "../Database";
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
            <div key={course._id} className="card">
              <img src={`/images/${course.image}`} className="card-img-top" />

              <div className="card-body">
                <Link
                  className="card-title"
                  to={`/Kanbas/Courses/${course._id}/Home`}
                >
                  {course.name}
                </Link>

                <p className="card-text card-section">{course.number}</p>
                <p className="card-text card-term">{course.term}</p>
                <Link
                  to={`/Kanbas/Courses/${course._id}/Home`}
                  className="btn btn-primary go"
                >
                  Go{" "}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
