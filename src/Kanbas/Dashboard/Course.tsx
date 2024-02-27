import { FaCircleXmark, FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Course as CourseType } from "../types";

interface CourseProps {
  course: CourseType;
  editCourse: (courseId: string) => void;
  deleteCourse: (courseId: string) => void;
}

const Course = ({ course, editCourse, deleteCourse }: CourseProps) => {
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
          onClick={(event) => {
            event.preventDefault();
            deleteCourse(course._id);
          }}
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
            onClick={(event) => {
              event.preventDefault();
              editCourse(course._id);
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Course;
