import { Link } from "react-router-dom";

interface CourseNavSmallProps {
  courseId: string | undefined;
  courseNavClass: string;
  onCourseNavArrowClicked: () => void;
  courseNavLinks: {
    label: string;
    icon: JSX.Element;
  }[];
}

const CourseNavSmall = ({
  courseId,
  courseNavClass,
  onCourseNavArrowClicked,
  courseNavLinks,
}: CourseNavSmallProps) => {
  return (
    <div className={courseNavClass}>
      <div className="course-nav-small">
        <ul className="course-nav-list">
          {courseNavLinks.map((link, index) => (
            <li key={`${link.label}-${index}`}>
              <Link
                to={`/Kanbas/Courses/${courseId}/${link.label}`}
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
  );
};

export default CourseNavSmall;
