import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { courseNavLinks, getKanbasLinks } from "../../constants";
import { courses } from "../../Database";
import "../../styles.css";
import { Course } from "../../types";
import HeaderMain from "./HeaderMain";
import CourseNavSmall from "./HeaderSmall/CourseNavSmall";
import HeaderSmall from "./HeaderSmall/HeaderSmall";
import KanbasNavSmall from "./HeaderSmall/KanbasNavSmall";
import "./index.css";

function Header() {
  const { pathname } = useLocation();
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [page, setPage] = useState("");

  const kanbasNavLinks = getKanbasLinks(
    "kanbas-nav-small-icon",
    "account-icon-small",
  );

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

  return (
    <div>
      {/* Course Page Header (wider screens) */}
      <HeaderMain course={course} page={page} />

      {/* Top Navigation (smaller screens) */}
      <HeaderSmall
        course={course}
        page={page}
        onKanbasSandwichClicked={onKanbasSandwichClicked}
        onCourseNavArrowClicked={onCourseNavArrowClicked}
        courseNavClass={courseNavClass}
      />

      {/* Kanbas Navigation (smaller screens) */}
      <KanbasNavSmall
        kanbasNavClass={kanbasNavClass}
        onKanbasSandwichClicked={onKanbasSandwichClicked}
        kanbasNavLinks={kanbasNavLinks}
      />

      {/* Course Navigation (smaller screens) */}
      <CourseNavSmall
        courseId={course?._id}
        courseNavClass={courseNavClass}
        onCourseNavArrowClicked={onCourseNavArrowClicked}
        courseNavLinks={courseNavLinks}
      />
    </div>
  );
}

export default Header;
