import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { getKanbasLinks } from "../constants";
import { useDispatch } from "react-redux";
import { getUser } from "../Users/userReducer";

function KanbasNavigation() {
  const { pathname } = useLocation();
  const accountIconId = pathname.includes("Account")
    ? "account-icon-active"
    : "account-icon";
  const isDash = pathname.includes("Dashboard");
  const navId = isDash ? "dash-kanbas-nav" : "";
  const responsiveNavClass = isDash ? "" : "d-none d-lg-block";

  const kanbasNavLinks = getKanbasLinks("fs-3 kanbas-nav-icon", accountIconId);
  const dispatch = useDispatch();

  const getAccountPath = () => {
    const user = dispatch(getUser());
    return user ? "/Profile" : "/Login";
  };

  const getPath = (label: string) => {
    let path = "/Kanbas/";
    if (label === "Courses") {
      return path + "Dashboard";
    } else if (label === "Account") {
      return path + label + getAccountPath();
    } else {
      return path + label;
    }
  };

  return (
    <div className={responsiveNavClass}>
      <div className="sticky-kanbas-nav" id={navId}>
        <ul className="wd-kanbas-navigation">
          <li id="logo">
            <Link to="/Kanbas/Dashboard">
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
              {/* Courses link goes to Dashboard for now */}
              <Link to={getPath(link.label)}>
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
