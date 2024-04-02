import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../../Users/userReducer";

interface KanbasNavSmallProps {
  kanbasNavClass: string;
  onKanbasSandwichClicked: () => void;
  kanbasNavLinks: {
    label: string;
    icon: JSX.Element;
  }[];
}

const KanbasNavSmall = ({
  kanbasNavClass,
  onKanbasSandwichClicked,
  kanbasNavLinks,
}: KanbasNavSmallProps) => {
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
                to={getPath(link.label)}
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
  );
};

export default KanbasNavSmall;
