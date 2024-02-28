import { useState, useEffect } from "react";
import { emptyCourse, validateForm } from "./constants";
import { Course } from "../types";
import { useDispatch } from "react-redux";
import { updateCourse } from "./coursesReducer";

function EditCourse({
  editableCourse,
  setEditableCourse,
  setIsAdding,
}: {
  editableCourse: Course;
  setEditableCourse: (course: Course) => void;
  setIsAdding: (isAdding: boolean) => void;
}) {
  const dispatch = useDispatch();
  const [updateCourseEnabled, setUpdateCourseEnabled] = useState(true);

  useEffect(() => {
    setUpdateCourseEnabled(validateForm(editableCourse));
  }, [editableCourse]);

  const onUpdateCourse = () => {
    if (validateForm(editableCourse)) {
      dispatch(updateCourse({ ...editableCourse }));
      setEditableCourse(emptyCourse);
      setIsAdding(true);
    }
  };

  const onCancelEdit = () => {
    setEditableCourse(emptyCourse);
    setIsAdding(true);
  };

  return (
    <div className="add-edit-courses">
      <h5>Edit Course</h5>

      <div className="add-edit-courses-container">
        <input
          value={editableCourse.name}
          placeholder="Course Name"
          className="form-control add-edit-courses-input"
          type="text"
          onChange={(e) =>
            setEditableCourse({ ...editableCourse, name: e.target.value })
          }
        />
        <input
          value={editableCourse.number}
          placeholder="Course Number"
          className="form-control add-edit-courses-input"
          type="text"
          onChange={(e) =>
            setEditableCourse({ ...editableCourse, number: e.target.value })
          }
        />
        <input
          value={editableCourse.term}
          placeholder="Course Term"
          className="form-control add-edit-courses-input"
          type="text"
          onChange={(e) =>
            setEditableCourse({ ...editableCourse, term: e.target.value })
          }
        />
        <input
          value={editableCourse.startDate}
          placeholder="Course Start Date"
          className="form-control add-edit-courses-input"
          type="date"
          onChange={(e) =>
            setEditableCourse({
              ...editableCourse,
              startDate: e.target.value,
            })
          }
        />
        <input
          value={editableCourse.endDate}
          placeholder="Course End Date"
          className="form-control add-edit-courses-input"
          type="date"
          onChange={(e) =>
            setEditableCourse({ ...editableCourse, endDate: e.target.value })
          }
        />
      </div>

      <div className="edit-course-ftr-btns">
        <button
          type="button"
          id="addEditCourseBtn"
          className="edit-course-cancel-btn"
          onClick={onCancelEdit}
        >
          Cancel
        </button>
        <button
          type="button"
          id="addEditCourseBtn"
          onClick={onUpdateCourse}
          disabled={!updateCourseEnabled}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default EditCourse;
