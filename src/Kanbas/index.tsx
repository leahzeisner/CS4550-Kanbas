import { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import Courses from "./Courses";
import Dashboard from "./Dashboard";
import { emptyCourse } from "./Dashboard/constants";
import KanbasNavigation from "./Navigation";
import { courses as dbcourses } from "./Database";
import { Course } from "./types";

function Kanbas() {
  const [courses, setCourses] = useState(dbcourses);
  const [isAdding, setIsAdding] = useState(true);
  const [editableCourse, setEditableCourse] = useState(emptyCourse);

  const addCourse = (newCourse: Course) => {
    setCourses([...courses, newCourse]);
  };

  const editCourse = (courseId: string) => {
    setIsAdding(false);
    setEditableCourse(courses.filter((course) => course._id === courseId)[0]);
  };

  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  // useEffect(() => console.log(courses), [courses]);

  return (
    <div className="screen-div">
      <KanbasNavigation />
      <div style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="Account" element={<h1>Account</h1>} />
          <Route
            path="Dashboard"
            element={
              <Dashboard
                courses={courses}
                setCourses={setCourses}
                editableCourse={editableCourse}
                setEditableCourse={setEditableCourse}
                addCourse={addCourse}
                editCourse={editCourse}
                deleteCourse={deleteCourse}
                isAdding={isAdding}
                setIsAdding={setIsAdding}
              />
            }
          />
          <Route
            path="Courses/:courseId/*"
            element={<Courses courses={courses} />}
          />
        </Routes>
      </div>
    </div>
  );
}
export default Kanbas;
