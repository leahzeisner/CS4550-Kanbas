import { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { comingUpItems, todos } from "../../../Database";
import { ComingUpList, TodoList } from "../../../types";
import "../index.css";
import ComingUp from "./ComingUp";
import Todo from "./Todo";

function Status() {
  const { courseId } = useParams();
  const [todoList, setTodoList] = useState<TodoList | undefined>(undefined);
  const [comingUpList, setComingUpList] = useState<ComingUpList | undefined>(
    undefined,
  );

  useEffect(() => {
    const courseTodoList = todos.filter((todo) => todo.course === courseId);
    const courseComingUpList = comingUpItems.filter(
      (item) => item.course === courseId,
    );
    setTodoList(
      courseTodoList.length > 0 ? courseTodoList[0].todos : undefined,
    );
    setComingUpList(
      courseComingUpList.length > 0 ? courseComingUpList[0].items : undefined,
    );
  }, [courseId]);

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

      <Todo todoList={todoList} />
      <ComingUp comingUpList={comingUpList} />
    </div>
  );
}

export default Status;
