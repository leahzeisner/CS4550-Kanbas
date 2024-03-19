import axios from "axios";
import { COURSES_API } from "../constants";

export const getCourses = async () => {
  const response = await axios.get(COURSES_API);
  return response.data;
};

export const addCourse = async (course) => {
  const response = await axios.post(COURSES_API, course);
  return response.data;
};

export const deleteCourse = async (courseId) => {
  const response = await axios.delete(`${COURSES_API}/${courseId}`);
  return response.data;
};

export const updateCourse = async (course) => {
  const response = await axios.put(`${COURSES_API}/${course._id}`, course);
  return response.data;
};

export const getCourse = async (courseId) => {
  const response = await axios.get(`${COURSES_API}/${courseId}`);
  return response.data;
};
