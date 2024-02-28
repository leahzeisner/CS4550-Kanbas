import { FaEllipsisV } from "react-icons/fa";
import AddCourse from "./AddCourse";
import Course from "./Course";
import EditCourse from "./EditCourse";
import "./index.css";
import { Courses } from "../types";
import { useSelector } from "react-redux";
import { KanbasState } from "../store";
import { useState } from "react";
import { emptyCourse } from "./constants";

function Dashboard() {
  const courses: Courses = useSelector(
    (state: KanbasState) => state.coursesReducer.coursesList,
  );
  const [isAdding, setIsAdding] = useState(true);
  const [editableCourse, setEditableCourse] = useState(emptyCourse);

  const onEditCourse = (courseId: string) => {
    setIsAdding(false);
    setEditableCourse(courses.filter((course) => course._id === courseId)[0]);
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
          <AddCourse />
        ) : (
          <EditCourse
            editableCourse={editableCourse}
            setEditableCourse={setEditableCourse}
            setIsAdding={setIsAdding}
          />
        )}

        <div className="d-flex flex-wrap">
          {courses.map((course) => (
            <Course course={course} onEditCourse={onEditCourse} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
