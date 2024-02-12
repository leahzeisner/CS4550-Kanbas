import { Link, useLocation } from "react-router-dom";
import "./index.css";
import "../../styles.css";
import { courses } from "../../Database";
import { links } from "../../constants";

function CourseNavigation() {
  const { pathname } = useLocation();
  const course = courses.filter((course) => pathname.includes(course._id))[0];

  return (
    <div className="sticky-second-nav collapse show" id="sticky-course-nav">
      <ul className="wd-navigation">
        {links.map((link, index) => (
          <li
            key={index}
            className={pathname.includes(link) ? "wd-active" : ""}
          >
            <Link to={`/Kanbas/Courses/${course._id}/${link}`}>{link}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CourseNavigation;
