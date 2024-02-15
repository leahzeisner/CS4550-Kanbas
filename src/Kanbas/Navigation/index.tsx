import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { getKanbasLinks } from "../constants";

function KanbasNavigation() {
  const { pathname } = useLocation();
  const accountIconId = pathname.includes("Account")
    ? "account-icon-active"
    : "account-icon";
  const isDash = pathname.includes("Dashboard");
  const navId = isDash ? "dash-kanbas-nav" : "";
  const responsiveNavClass = isDash ? "" : "d-none d-lg-block";

  const kanbasNavLinks = getKanbasLinks("fs-3 kanbas-nav-icon", accountIconId);

  return (
    <div className={responsiveNavClass}>
      <div className="sticky-kanbas-nav" id={navId}>
        <ul className="wd-kanbas-navigation">
          <li id="logo">
            <Link to="/Kanbas/Dashboard/">
              <img
                className="nu-logo"
                src="/images/northeastern.png"
                alt="Northeastern logo"
              />
            </Link>
          </li>

          {kanbasNavLinks.map((link, index) => (
            <li
              key={index}
              className={pathname.includes(link.label) ? "wd-active" : ""}
            >
              {/* Always goes to course 12631 for now, FIX LATER */}
              <Link
                to={`/Kanbas/${link.label}${link.label === "Courses" ? "/12631/Home" : ""}`}
              >
                {" "}
                {link.icon}
                <br />
                {link.label}{" "}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default KanbasNavigation;
