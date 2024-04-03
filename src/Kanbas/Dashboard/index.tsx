import { FaEllipsisV } from "react-icons/fa";
import AddCourse from "./AddCourse";
import Course from "./Course";
import EditCourse from "./EditCourse";
import "./index.css";
import { Course as CourseType, Courses } from "../types";
import { useEffect, useState } from "react";
import { getEmptyCourse } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../store";
import {
  setCourses,
  updateCourse as updateCourseAction,
} from "./coursesReducer";
import * as client from "./client";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: KanbasState) => state.userReducer.user);
  const courses: Courses = useSelector(
    (state: KanbasState) => state.coursesReducer.courses,
  );

  const [isAdding, setIsAdding] = useState(true);
  const [editableCourse, setEditableCourse] = useState(getEmptyCourse());

  useEffect(() => {
    if (!user) {
      alert("Please login/signup first");
      navigate("/Kanbas/Account/Login");
    }
    client.getCourses().then((courses) => {
      dispatch(setCourses(courses));
    });
  }, []);

  const updateCourse = async (course: CourseType) => {
    client
      .updateCourse(course)
      .then(() => dispatch(updateCourseAction(course)));
  };

  const onEditCourse = async (courseId: string) => {
    setIsAdding(false);
    client.getCourse(courseId).then((course) => setEditableCourse(course));
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
            updateCourse={updateCourse}
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
