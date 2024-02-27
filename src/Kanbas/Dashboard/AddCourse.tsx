import { useState, useEffect } from "react";
import { emptyCourse, validateForm } from "./constants";
import { Course, Courses } from "../types";

function AddCourse({
  courses,
  setCourses,
}: {
  courses: Courses;
  setCourses: (courses: Courses) => void;
}) {
  const [course, setCourse] = useState<Course>(emptyCourse);
  const [addCourseEnabled, setAddCourseEnabled] = useState(true);

  useEffect(() => {
    setAddCourseEnabled(validateForm(course));
  }, [course]);

  const addNewCourse = () => {
    if (validateForm(course)) {
      const newCourse = {
        ...course,
        _id: new Date().getTime().toString(),
        image: "/webdev2.webp", // TEMPORARY
      };
      setCourses([...courses, newCourse]);
      setCourse(emptyCourse);
    }
  };

  return (
    <div className="add-edit-courses">
      <h5>Add Course</h5>
      <input
        value={course.name}
        placeholder="Course Name"
        className="form-control add-edit-courses-input"
        type="text"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <input
        value={course.number}
        placeholder="Course Number"
        className="form-control add-edit-courses-input"
        type="text"
        onChange={(e) => setCourse({ ...course, number: e.target.value })}
      />
      <input
        value={course.term}
        placeholder="Course Term"
        className="form-control add-edit-courses-input"
        type="text"
        onChange={(e) => setCourse({ ...course, term: e.target.value })}
      />
      <input
        value={course.startDate}
        placeholder="Course Start Date"
        className="form-control add-edit-courses-input"
        type="date"
        onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
      />
      <input
        value={course.endDate}
        placeholder="Course End Date"
        className="form-control add-edit-courses-input"
        type="date"
        onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
      />
      <button
        type="button"
        id="addEditCourseBtn"
        onClick={addNewCourse}
        disabled={!addCourseEnabled}
      >
        Add
      </button>
    </div>
  );
}

export default AddCourse;
