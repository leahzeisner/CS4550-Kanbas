import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { emptyCourse } from "./constants";
import { courses as dbcourses } from "../Database";
import AddCourse from "./AddCourse";
import Course from "./Course";
import EditCourse from "./EditCourse";
import "./index.css";

function Dashboard() {
  const [courses, setCourses] = useState(dbcourses);
  const [isAdding, setIsAdding] = useState(true);
  const [editableCourse, setEditableCourse] = useState(emptyCourse);

  const editCourse = (courseId: string) => {
    setIsAdding(false);
    setEditableCourse(courses.filter((course) => course._id === courseId)[0]);
  };

  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };

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

        {isAdding ? (
          <AddCourse courses={courses} setCourses={setCourses} />
        ) : (
          <EditCourse
            editableCourse={editableCourse}
            setEditableCourse={setEditableCourse}
            courses={courses}
            setCourses={setCourses}
            setIsAdding={setIsAdding}
          />
        )}

        <div className="d-flex flex-wrap">
          {courses.map((course) => (
            <Course
              course={course}
              editCourse={editCourse}
              deleteCourse={deleteCourse}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
