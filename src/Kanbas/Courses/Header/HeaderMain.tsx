import { FaBars, FaArrowRight, FaBinoculars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Course } from "../../types";

interface HeaderMainProps {
  course: Course | undefined;
  page: string;
}

const HeaderMain = ({ course, page }: HeaderMainProps) => {
  const toggleCourseNav = () => {
    const courseNav = document.getElementById("sticky-course-nav");
    const mainContent = Array.from(
      document.getElementsByClassName(
        "main-content",
      ) as HTMLCollectionOf<HTMLElement>,
    )[0];
    if (!courseNav || !mainContent) {
      return;
    }

    const toggleClass = "d-lg-block";

    if (courseNav.classList.contains(toggleClass)) {
      courseNav.classList.remove(toggleClass);
      mainContent.style.margin = "80px 0px 0px 125px";
    } else {
      courseNav.classList.add(toggleClass);
      mainContent.style.margin = "80px 0px 0px 280px";
    }
  };

  return (
    <div className="sticky-header d-none d-lg-block">
      <div className="sticky-header-content">
        <div className="sticky-header-left">
          <button type="button" className="sticky-header-bars-btn">
            <FaBars
              className="sticky-header-bars"
              onClick={toggleCourseNav}
            ></FaBars>
          </button>
          <Link
            to={`/Kanbas/Courses/${course?._id}/Home`}
            className="header-course-num header-course-num-large"
          >
            {course?.number}
          </Link>

          <div className="sticky-header-subsec">
            <FaArrowRight
              size={18}
              className="sticky-header-subsec-icon"
            ></FaArrowRight>
            <span>{page}</span>
          </div>
        </div>

        <div className="sticky-header-right">
          <button type="button" className="student-view-btn">
            <FaBinoculars id="student-view-icon"></FaBinoculars> Student View
          </button>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default HeaderMain;
