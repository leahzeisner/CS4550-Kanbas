import { FaEllipsisV } from "react-icons/fa";
import AddCourse from "./AddCourse";
import Course from "./Course";
import EditCourse from "./EditCourse";
import "./index.css";
import { Course as CourseType, Courses } from "../types";
import { useEffect, useState } from "react";
import { getEmptyCourse } from "./utils";
import axios from "axios";

function Dashboard() {
  const COURSES_API = "http://localhost:4000/api/courses";
  const [courses, setCourses] = useState<Courses>([]);
  const [isAdding, setIsAdding] = useState(true);
  const [editableCourse, setEditableCourse] = useState(getEmptyCourse());

  useEffect(() => {
    findAllCourses();
  }, []);

  const findAllCourses = async () => {
    const response = await axios.get(COURSES_API);
    setCourses(response.data);
  };

  const addCourse = async (course: CourseType) => {
    const response = await axios.post(COURSES_API, course);
    setCourses([...courses, response.data]);
  };

  const deleteCourse = async (courseId: string) => {
    await axios.delete(`${COURSES_API}/${courseId}`);
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  const updateCourse = async (course: CourseType) => {
    await axios.put(`${COURSES_API}/${course._id}`, course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        }
        return c;
      }),
    );
  };

  const onEditCourse = async (courseId: string) => {
    setIsAdding(false);
    const response = await axios.get(`${COURSES_API}/${courseId}`);
    setEditableCourse(response.data);
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
          <AddCourse addCourse={addCourse} />
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
            <Course
              course={course}
              onEditCourse={onEditCourse}
              deleteCourse={deleteCourse}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
