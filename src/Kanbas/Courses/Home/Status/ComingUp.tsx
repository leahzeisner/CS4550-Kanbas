import { useEffect } from "react";
import { FaCalendar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { comingUpItems } from "../../../Database";
import { KanbasState } from "../../../store";
import { ComingUpList } from "../../../types";
import ComingUpListItem from "./ComingUpListItem";
import { setComingUpList } from "./statusReducer";

const ComingUp = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const comingUpList: ComingUpList = useSelector(
    (state: KanbasState) => state.statusReducer.comingUpList,
  );

  useEffect(() => {
    const classComingUpItems = comingUpItems.filter(
      (item) => item._id === courseId,
    );
    if (comingUpItems.length > 0) {
      dispatch(setComingUpList(classComingUpItems[0].items));
    }
  }, []);

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
        {comingUpList.map((item) => (
          <ComingUpListItem item={item}></ComingUpListItem>
        ))}
      </div>

      {comingUpList.length !== 0 && (
        <span className="bottom-text">12 more in the next week...</span>
      )}
    </div>
  );
};

export default ComingUp;
