import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { courseNavLinks, getKanbasLinks } from "../../constants";
import { setPage } from "../../Dashboard/coursesReducer";
import "../../styles.css";
import HeaderMain from "./HeaderMain";
import CourseNavSmall from "./HeaderSmall/CourseNavSmall";
import HeaderSmall from "./HeaderSmall/HeaderSmall";
import KanbasNavSmall from "./HeaderSmall/KanbasNavSmall";
import "./index.css";

function Header() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const kanbasNavLinks = getKanbasLinks(
    "kanbas-nav-small-icon",
    "account-icon-small",
  );

  const hiddenClass = "d-none d-lg-none";
  const [kanbasNavClass, setKanbasNavClass] = useState(hiddenClass);
  const [courseNavClass, setCourseNavClass] = useState(hiddenClass);

  useEffect(() => {
    const pagesList = courseNavLinks.filter((link) =>
      pathname.includes(link.label.replace(/\s/g, "")),
    );
    dispatch(setPage(pagesList.length > 0 ? pagesList[0].label : ""));
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
      <HeaderMain />

      {/* Top Navigation (smaller screens) */}
      <HeaderSmall
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
        courseNavClass={courseNavClass}
        onCourseNavArrowClicked={onCourseNavArrowClicked}
        courseNavLinks={courseNavLinks}
      />
    </div>
  );
}

export default Header;
