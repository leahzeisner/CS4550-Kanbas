import axios from "axios";
import { COURSES_API } from "../constants";
import { Course } from "../types";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const getCourses = async () => {
  const response = await axiosWithCredentials.get(`${COURSES_API}`);
  return response.data;
};

export const addCourse = async (course: Course) => {
  const response = await axiosWithCredentials.post(`${COURSES_API}`, course);
  return response.data;
};

export const deleteCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}`,
  );
  return response.data;
};

export const updateCourse = async (course: Course) => {
  const response = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course,
  );
  return response.data;
};

export const getCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}`);
  return response.data;
};
