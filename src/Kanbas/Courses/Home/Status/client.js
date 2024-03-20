import axios from "axios";
import { COURSES_API } from "../../../constants";

export const findCourseTodos = async (courseId) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/todos`);
  return response.data;
};

export const deleteTodo = async (courseId, todoId) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/todos/${todoId}`,
  );
  return response.data;
};

export const findCourseComingUps = async (courseId) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/comingups`);
  return response.data;
};
