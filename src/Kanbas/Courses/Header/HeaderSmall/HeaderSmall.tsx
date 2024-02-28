import { FaBars, FaBinoculars, FaArrowDown } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { Course } from "../../../types";

interface HeaderSmallProps {
  onKanbasSandwichClicked: () => void;
  onCourseNavArrowClicked: () => void;
  courseNavClass: string;
}

const HeaderSmall = ({
  onKanbasSandwichClicked,
  onCourseNavArrowClicked,
  courseNavClass,
}: HeaderSmallProps) => {
  const course: Course = useSelector(
    (state: KanbasState) => state.coursesReducer.course,
  );
  const page: string = useSelector(
    (state: KanbasState) => state.coursesReducer.page,
  );

  return (
    <div className="top-nav d-flex d-lg-none">
      <button
        type="button"
        className="top-nav-button"
        onClick={onKanbasSandwichClicked}
      >
        <FaBars className="top-nav-bars"></FaBars>
      </button>

      <div>
        <button
          type="button"
          className="header-course-num-small"
          onClick={onCourseNavArrowClicked}
        >
          {course?.number}
          <br />
          <span>{page}</span>
        </button>
      </div>

      <div>
        <button type="button" className="top-nav-button">
          <FaBinoculars></FaBinoculars>
        </button>
        <button
          type="button"
          className="top-nav-button"
          id="top-nav-course-toggle"
          onClick={onCourseNavArrowClicked}
        >
          {courseNavClass.includes("d-flex") ? (
            <FaXmark></FaXmark>
          ) : (
            <FaArrowDown></FaArrowDown>
          )}
        </button>
      </div>
    </div>
  );
};

export default HeaderSmall;
