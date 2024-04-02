import axios from "axios";
import { COURSES_API } from "../constants";
import { Course } from "../types";

export const getCourses = async () => {
  const response = await axios.get(COURSES_API);
  return response.data;
};

export const addCourse = async (course: Course) => {
  const response = await axios.post(COURSES_API, course);
  return response.data;
};

export const deleteCourse = async (courseId: string) => {
  const response = await axios.delete(`${COURSES_API}/${courseId}`);
  return response.data;
};

export const updateCourse = async (course: Course) => {
  const response = await axios.put(`${COURSES_API}/${course._id}`, course);
  return response.data;
};

export const getCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}`);
  return response.data;
};
