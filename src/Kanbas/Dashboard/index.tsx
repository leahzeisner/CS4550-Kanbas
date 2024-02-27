import { FaEllipsisV } from "react-icons/fa";
import AddCourse from "./AddCourse";
import Course from "./Course";
import EditCourse from "./EditCourse";
import "./index.css";
import { Courses, Course as CourseItem } from "../types";

function Dashboard({
  courses,
  setCourses,
  editableCourse,
  setEditableCourse,
  editCourse,
  deleteCourse,
  isAdding,
  setIsAdding,
  addCourse,
}: {
  courses: Courses;
  setCourses: (courses: Courses) => void;
  editableCourse: CourseItem;
  setEditableCourse: (course: CourseItem) => void;
  editCourse: (courseId: string) => void;
  deleteCourse: (courseId: string) => void;
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
  addCourse: (newCourse: CourseItem) => void;
}) {
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
