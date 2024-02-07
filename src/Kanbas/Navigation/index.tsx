import { Link, useLocation } from "react-router-dom";
import "./index.css";
import {
  FaTachometerAlt,
  FaRegUserCircle,
  FaBook,
  FaRegCalendarAlt,
  FaInbox,
  FaClock,
  FaLaptop,
  FaArrowCircleRight,
  FaQuestionCircle,
} from "react-icons/fa";

function KanbasNavigation() {
  const { pathname } = useLocation();
  const accountIconId = pathname.includes("Account")
    ? "account-icon-active"
    : "account-icon";
  const navId = pathname.includes("Dashboard") ? "dash-kanbas-nav" : "";

  const links = [
    {
      label: "Account",
      icon: <FaRegUserCircle className="fs-3" id={accountIconId} />,
    },
    {
      label: "Dashboard",
      icon: <FaTachometerAlt className="fs-3 kanbas-nav-icon" />,
    },
    { label: "Courses", icon: <FaBook className="fs-3 kanbas-nav-icon" /> },
    {
      label: "Calendar",
      icon: <FaRegCalendarAlt className="fs-3 kanbas-nav-icon" />,
    },
    { label: "Inbox", icon: <FaInbox className="fs-3 kanbas-nav-icon" /> },
    { label: "History", icon: <FaClock className="fs-3 kanbas-nav-icon" /> },
    { label: "Studio", icon: <FaLaptop className="fs-3 kanbas-nav-icon" /> },
    {
      label: "Commons",
      icon: <FaArrowCircleRight className="fs-3 kanbas-nav-icon" />,
    },
    {
      label: "Help",
      icon: <FaQuestionCircle className="fs-3 kanbas-nav-icon" />,
    },
  ];

  return (
    <div className="sticky-kanbas-nav" id={navId}>
      <ul className="wd-kanbas-navigation">
        <li id="logo">
          <a href="/Kanbas/Dashboard/screen.html">
            <img
              className="nu-logo"
              src="/images/northeastern.png"
              alt="Northeastern logo"
            />
          </a>
        </li>

        {links.map((link, index) => (
          <li
            key={index}
            className={pathname.includes(link.label) ? "wd-active" : ""}
          >
            <Link to={`/Kanbas/${link.label}`} className="kanbas-nav-link">
              {" "}
              {link.icon}
              <br />
              {link.label}{" "}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default KanbasNavigation;
