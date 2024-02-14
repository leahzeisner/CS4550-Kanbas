import { Navigate, Route, Routes } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import "../styles.css";
import Header from "./Header";
import Home from "./Home";

function Courses() {
  return (
    <div>
      <Header />
      <CourseNavigation />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Home" />} />
          <Route path="/:courseId/Home" element={<Home />} />
          <Route path="/:courseId/Modules" element={<Modules />} />
          <Route path="Piazza" element={<h1>Piazza</h1>} />
          <Route path="Assignments" element={<h1>Assignments</h1>} />
          <Route
            path="Assignments/:assignmentId"
            element={<h1>Assignment Editor</h1>}
          />
          <Route path="Grades" element={<h1>Grades</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default Courses;
