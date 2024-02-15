import {
  FaArrowCircleRight,
  FaBan,
  FaBell,
  FaBullhorn,
  FaCalendar,
  FaChartBar,
  FaCheckCircle,
  FaFile,
  FaHome,
  FaTimes,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { comingUpItems, todos } from "../../Database";
import "./index.css";

function Status() {
  const { courseId } = useParams();
  const todoList = todos.filter((todo) => todo.course === courseId);
  const comingUpList = comingUpItems.filter((item) => item.course === courseId);

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

      <div className="todo">
        <p className="course-info-section">To Do</p>
        <hr className="hr-line" />

        <div className="todo-items">
          {todoList.length !== 0 &&
            todoList[0].todos?.map((todo, index) => (
              <div className="todo-item">
                <div className="todo-item-left">
                  <span className="todo-item-num">{index + 1}</span>
                  <div className="todo-item-info">
                    <Link to={todo.url} className="todo-item-title">
                      {todo.title}
                    </Link>
                    <span className="todo-item-due-date">
                      {todo.points} points <span>&#x2022;</span> {todo.due_date}
                    </span>
                  </div>
                </div>

                <button className="todo-item-delete" type="button">
                  <FaTimes></FaTimes>
                </button>
              </div>
            ))}
        </div>
      </div>

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
          {comingUpList.length !== 0 &&
            comingUpList[0].items?.map((item) => (
              <div className="coming-up-item">
                <FaCalendar className="coming-up-icon"></FaCalendar>
                <div className="coming-up-item-info">
                  <Link to="#" className="coming-up-item-title">
                    {item.title}
                  </Link>
                  <span className="coming-up-item-section">{item.section}</span>
                  <span className="coming-up-item-date">{item.date}</span>
                </div>
              </div>
            ))}
        </div>

        {comingUpList.length !== 0 && (
          <span className="bottom-text">12 more in the next week...</span>
        )}
      </div>
    </div>
  );
}

export default Status;
