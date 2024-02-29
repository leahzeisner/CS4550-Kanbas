import { Navigate, Route, Routes, useParams } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import "../styles.css";
import Header from "./Header";
import Home from "./Home";
import Assignments from "./Assignments";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../Dashboard/coursesReducer";
import { Courses as CoursesType } from "../types";
import { KanbasState } from "../store";

function Courses() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const coursesList: CoursesType = useSelector(
    (state: KanbasState) => state.coursesReducer.coursesList,
  );

  useEffect(() => {
    dispatch(setCourse(coursesList.find((course) => course._id === courseId)));
  }, []);

  return (
    <div>
      <Header />
      <CourseNavigation />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Modules" element={<Modules />} />
          <Route path="/Piazza" element={<h1>Piazza</h1>} />
          <Route path="/Assignments" element={<Assignments />} />
          <Route
            path="/Assignments/:assignmentId"
            element={<h1>Assignment Editor</h1>}
          />
          <Route path="/Grades" element={<h1>Grades</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default Courses;
