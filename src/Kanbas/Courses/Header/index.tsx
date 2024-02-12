import { FaArrowRight, FaBars, FaBinoculars } from "react-icons/fa";
import { useLocation } from "react-router";
import { links } from "../../constants";
import { courses } from "../../Database";
import "../../styles.css";

function Header() {
  const { pathname } = useLocation();
  const course = courses.filter((course) => pathname.includes(course._id))[0];
  const page = links.filter((link) => pathname.includes(link));

  return (
    <div className="sticky-header">
      <div className="sticky-header-content">
        <div className="sticky-header-left">
          <button
            type="button"
            className="sticky-header-bars-btn"
            data-bs-toggle="collapse"
            data-bs-target="#sticky-course-nav"
            aria-expanded="true"
            aria-controls="sticky-course-nav"
          >
            <FaBars className="sticky-header-bars"></FaBars>
          </button>
          <span className="sticky-header-class">{course?.number}</span>

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
            <FaBinoculars></FaBinoculars> Student View
          </button>
        </div>
      </div>

      <hr />
    </div>
  );
}

export default Header;
