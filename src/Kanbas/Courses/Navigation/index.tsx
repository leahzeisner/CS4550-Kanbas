import { Link, useLocation } from "react-router-dom";
import "./index.css";
import "../../styles.css";
import { courses } from "../../Database";
import { courseNavLinks } from "../../constants";

function CourseNavigation() {
  const { pathname } = useLocation();
  const course = courses.filter((course) => pathname.includes(course._id))[0];

  return (
    <div className="sticky-second-nav d-none d-lg-block" id="sticky-course-nav">
      <ul className="wd-navigation">
        {courseNavLinks.map((link, index) => (
          <li
            key={index}
            className={
              pathname.includes(link.label.replace(/\s/g, ""))
                ? "wd-active"
                : ""
            }
          >
            <Link
              to={`/Kanbas/Courses/${course._id}/${link.label.replace(/\s/g, "")}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CourseNavigation;
