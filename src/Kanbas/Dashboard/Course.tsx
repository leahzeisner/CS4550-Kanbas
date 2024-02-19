import { Link } from "react-router-dom";
import { Course as CourseType } from "../types";

interface CourseProps {
  course: CourseType;
}

const Course = ({ course }: CourseProps) => {
  return (
    <div key={course._id} className="card">
      <img src={`/images/${course.image}`} className="card-img-top" />

      <div className="card-body">
        <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}>
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
  );
};

export default Course;
