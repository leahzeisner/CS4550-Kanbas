import { Navigate, Route, Routes, useParams } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import "../styles.css";
import Header from "./Header";
import Home from "./Home";
import Assignments from "./Assignments";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCourse } from "../Dashboard/coursesReducer";
import { getCourse } from "../Dashboard/client";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails/QuizDetails";
import QuizPreview from "./Quizzes/QuizPreview";

function Courses() {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (courseId) {
      getCourse(courseId).then((c) => dispatch(setCourse(c)));
    }
  }, [courseId]);

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
          <Route path="/Quizzes" element={<Quizzes />} />
          <Route path="/Quizzes/:quizId" element={<QuizDetails />} />
          <Route path="/Quizzes/Preview/:quizId" element={<QuizPreview />} />
          <Route path="/Grades" element={<h1>Grades</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default Courses;
