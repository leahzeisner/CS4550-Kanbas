import { FaCircleXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Course as CourseType } from "../types";
import { deleteCourse } from "./coursesReducer";

interface CourseProps {
  course: CourseType;
  onEditCourse: (courseId: string) => void;
}

const Course = ({ course, onEditCourse }: CourseProps) => {
  const dispatch = useDispatch();

  return (
    <div key={course._id} className="card">
      <div className="card-img">
        <img
          src={`/images/${course.image}`}
          alt="Course"
          className="card-img-top"
        />
        <button
          type="button"
          className="btn btn-danger"
          id="deleteCourseBtn"
          onClick={() => dispatch(deleteCourse(course))}
        >
          <FaCircleXmark id="delete-course" size={25} />
        </button>
      </div>

      <div className="card-body">
        <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}>
          {course.name}
        </Link>

        <p className="card-text card-section">{course.number}</p>
        <p className="card-text card-term">{course.term}</p>
        <div className="card-buttons">
          <Link
            to={`/Kanbas/Courses/${course._id}/Home`}
            className="btn btn-primary"
            id="goToCourseLink"
          >
            Go{" "}
          </Link>

          <button
            type="button"
            className="btn btn-secondary"
            id="editCourseBtn"
            onClick={() => onEditCourse(course._id)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Course;
