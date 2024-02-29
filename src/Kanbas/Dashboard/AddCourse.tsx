import { useState, useEffect } from "react";
import { getEmptyCourse, validateForm } from "./utils";
import { Course } from "../types";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addCourse } from "./coursesReducer";

function AddCourse() {
  const dispatch = useDispatch();
  const [course, setCourse] = useState<Course>(getEmptyCourse());
  const [addCourseEnabled, setAddCourseEnabled] = useState(true);
  const [addingCourse, setAddingCourse] = useState(false);

  useEffect(() => {
    setAddCourseEnabled(validateForm(course));
  }, [course]);

  const addNewCourse = () => {
    if (validateForm(course)) {
      const newCourse = {
        ...course,
        image: "/webdev2.webp", // TEMPORARY
      };
      setCourse(getEmptyCourse());
      dispatch(addCourse(newCourse));
      setAddingCourse(false);
    }
  };

  return (
    <div className="add-edit-courses">
      <div className="add-edit-courses-title">
        <h5>Add Course</h5>

        <button
          type="button"
          id="addCoursesArrowBtn"
          onClick={() => setAddingCourse(!addingCourse)}
        >
          {addingCourse ? (
            <FaMinus className="ms-2" size={20}></FaMinus>
          ) : (
            <FaPlus className="ms-2" size={20}></FaPlus>
          )}
        </button>
      </div>

      {addingCourse && (
        <div>
          <div className="add-edit-courses-container">
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
              onChange={(e) =>
                setCourse({ ...course, startDate: e.target.value })
              }
            />
            <input
              value={course.endDate}
              placeholder="Course End Date"
              className="form-control add-edit-courses-input"
              type="date"
              onChange={(e) =>
                setCourse({ ...course, endDate: e.target.value })
              }
            />
          </div>

          <div className="add-course-add-btn">
            <button
              type="button"
              id="addEditCourseBtn"
              onClick={addNewCourse}
              disabled={!addCourseEnabled}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCourse;
