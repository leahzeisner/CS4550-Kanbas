import { FaCalendar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ComingUpList } from "../../../types";
import ComingUpListItem from "./ComingUpListItem";

interface ComingUpProps {
  comingUpList: ComingUpList | undefined;
}

const ComingUp = ({ comingUpList }: ComingUpProps) => {
  return (
    <div className="coming-up">
      <div className="coming-up-header">
        <p className="course-info-section">Coming Up</p>
        <Link to="#" id="coming-up-header-link">
          <FaCalendar className="view-calendar-icon"></FaCalendar>
          View Calendar
        </Link>
      </div>

      <hr className="hr-line" />

      <div className="coming-up-items">
        {comingUpList?.map((item) => (
          <ComingUpListItem item={item}></ComingUpListItem>
        ))}
      </div>

      {comingUpList && comingUpList.length !== 0 && (
        <span className="bottom-text">12 more in the next week...</span>
      )}
    </div>
  );
};

export default ComingUp;
