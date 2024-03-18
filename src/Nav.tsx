import { Link, useLocation } from "react-router-dom";
import "./index.css";

function Nav() {
  const { pathname } = useLocation();

  return (
    <ul className="nav nav-tabs mt-2">
      <li className="nav-item">
        <Link
          to="/Labs/a3"
          className={`nav-link ${pathname.includes("a3") ? "active" : ""}`}
        >
          A3
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Labs/a4"
          className={`nav-link ${pathname.includes("a4") ? "active" : ""}`}
        >
          A4
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Labs/a5"
          className={`nav-link ${pathname.includes("a5") ? "active" : ""}`}
        >
          A5
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/hello"
          className={`nav-link ${pathname.includes("hello") ? "active" : ""}`}
        >
          Hello
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Kanbas"
          className={`nav-link ${pathname.includes("Kanbas") ? "active" : ""}`}
        >
          Kanbas
        </Link>
      </li>
    </ul>
  );
}
export default Nav;
