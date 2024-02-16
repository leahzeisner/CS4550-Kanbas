import { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowRight,
  FaBars,
  FaBinoculars,
} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { courseNavLinks, getKanbasLinks } from "../../constants";
import { courses } from "../../Database";
import "../../styles.css";
import { Course } from "../../types";
import "./index.css";

function Header() {
  const { pathname } = useLocation();
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [page, setPage] = useState("");

  const kanbasNavLinks = getKanbasLinks(
    "kanbas-nav-small-icon",
    "account-icon-small",
  );
  const mainContentPadding = "80px 0px 0px 280px";
  const hiddenClass = "d-none d-lg-none";
  const [kanbasNavClass, setKanbasNavClass] = useState(hiddenClass);
  const [courseNavClass, setCourseNavClass] = useState(hiddenClass);

  useEffect(() => {
    const coursesList = courses.filter((course) =>
      pathname.includes(course._id),
    );
    setCourse(coursesList.length > 0 ? coursesList[0] : undefined);

    const pagesList = courseNavLinks.filter((link) =>
      pathname.includes(link.label.replace(/\s/g, "")),
    );
    setPage(pagesList.length > 0 ? pagesList[0].label : "");
  }, [pathname]);

  const onKanbasSandwichClicked = () => {
    if (kanbasNavClass.includes("d-flex")) {
      setKanbasNavClass(hiddenClass);
    } else {
      setCourseNavClass(hiddenClass);
      setKanbasNavClass("d-flex d-lg-none");
    }
  };

  const onCourseNavArrowClicked = () => {
    if (courseNavClass.includes("d-flex")) {
      setCourseNavClass(hiddenClass);
    } else {
      setKanbasNavClass(hiddenClass);
      setCourseNavClass("d-flex d-lg-none");
    }
  };

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
      mainContent.style.margin = mainContentPadding;
    }
  };

  return (
    <div>
      {/* Course Page Header (wider screens) */}
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

      {/* Top Navigation (smaller screens) */}
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

      {/* Kanbas Navigation (smaller screens) */}
      <div className={kanbasNavClass}>
        <div className="kanbas-nav-small">
          <ul className="kanbas-nav-list">
            <li id="kanbas-nav-close">
              <button
                type="button"
                className="btn-close"
                onClick={onKanbasSandwichClicked}
              ></button>
            </li>

            {kanbasNavLinks.map((link, index) => (
              <li key={`${link.label}-${index}`}>
                {/* Courses link goes to Dashboard for now */}
                <Link
                  to={`/Kanbas/${link.label === "Courses" ? "Dashboard" : link.label}`}
                  className="kanbas-nav-list-link"
                  onClick={onKanbasSandwichClicked}
                >
                  <div>
                    {link.icon}
                    <span>{link.label}</span>
                  </div>
                  <FaArrowRight id="arrow-right"></FaArrowRight>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Course Navigation (smaller screens) */}
      <div className={courseNavClass}>
        <div className="course-nav-small">
          <ul className="course-nav-list">
            {courseNavLinks.map((link, index) => (
              <li key={`${link.label}-${index}`}>
                <Link
                  to={`/Kanbas/Courses/${course?._id}/${link.label}`}
                  className="course-nav-list-link"
                  onClick={onCourseNavArrowClicked}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
