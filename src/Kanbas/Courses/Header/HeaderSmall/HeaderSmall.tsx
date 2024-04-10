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
  const pageList: string[] = useSelector(
    (state: KanbasState) => state.coursesReducer.pageList,
  );

  const getSpacer = () => (
    <>
      <span>&nbsp;&nbsp;</span>
      <span>{">"}</span>
      <span>&nbsp;&nbsp;</span>
    </>
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
          {pageList.map((page, index) => (
            <>
              <span>{page}</span>
              {index !== pageList.length - 1 && getSpacer()}
            </>
          ))}
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
