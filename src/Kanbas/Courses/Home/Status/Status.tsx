import {
  FaArrowCircleRight,
  FaBan,
  FaBell,
  FaBullhorn,
  FaChartBar,
  FaCheckCircle,
  FaFile,
  FaHome,
} from "react-icons/fa";
import "../index.css";
import ComingUp from "./ComingUp";
import Todo from "./Todo";

function Status() {
  return (
    <div className="course-info d-none d-xl-block">
      <div className="course-status">
        <p className="course-info-section">Course Status</p>

        <div className="publish-buttons">
          <button type="button">
            <FaBan className="publish-icon"></FaBan>
            Unpublish
          </button>
          <button type="button" id="publish">
            <FaCheckCircle className="publish-icon"></FaCheckCircle>
            Published
          </button>
        </div>

        <div className="status-buttons">
          <button type="button">
            <FaFile className="status-icon"></FaFile>
            Import Existing Content
          </button>
          <button type="button">
            <FaArrowCircleRight className="status-icon"></FaArrowCircleRight>
            Import from Commons
          </button>
          <button type="button">
            <FaHome className="status-icon"></FaHome>
            Choose Home Page
          </button>
          <button type="button">
            <FaChartBar className="status-icon"></FaChartBar>
            View Course Stream
          </button>
          <button type="button">
            <FaBullhorn className="status-icon"></FaBullhorn>
            New Announcement
          </button>
          <button type="button">
            <FaChartBar className="status-icon"></FaChartBar>
            New Analytics
          </button>
          <button type="button">
            <FaBell className="status-icon"></FaBell>
            View Course Notifications
          </button>
        </div>
      </div>

      <Todo />
      <ComingUp />
    </div>
  );
}

export default Status;
