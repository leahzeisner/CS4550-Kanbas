import { useState, useEffect } from "react";
import { getEmptyCourse, validateCourseForm } from "./utils";
import { Course, Courses } from "../types";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../store";
import { addCourse } from "./coursesReducer";
import * as client from "./client";

function AddCourse() {
  const dispatch = useDispatch();
  const courses: Courses = useSelector(
    (state: KanbasState) => state.coursesReducer.courses,
  );
  const [course, setCourse] = useState<Course>(getEmptyCourse());
  const [addCourseEnabled, setAddCourseEnabled] = useState(true);
  const [addingCourse, setAddingCourse] = useState(false);

  useEffect(() => {
    setAddCourseEnabled(validateCourseForm(course));
  }, [course]);

  const getRandomImage = () => {
    const images = [
      "soft-dev.jpg",
      "webdev.png",
      "webdev2.webp",
      "webdev3.jpg",
      "webdev4.jpg",
      "webdev4.webp",
    ];
    const random = Math.floor(Math.random() * images.length);
    return "/" + images[random];
  };

  const addNewCourse = async () => {
    if (validateCourseForm(course)) {
      const newCourse = {
        ...course,
        image: getRandomImage(),
      };
      setCourse(getEmptyCourse());
      client.addCourse(newCourse).then((c) => dispatch(addCourse(c)));
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
