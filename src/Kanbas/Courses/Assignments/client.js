import axios from "axios";
import { COURSES_API, ASSIGNMENTS_API } from "../../constants";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const findCourseAssignments = async (courseId) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/assignments`,
  );
  return response.data;
};

export const findAssignmentById = async (assignmentId) => {
  const response = await axiosWithCredentials.get(
    `${ASSIGNMENTS_API}/${assignmentId}`,
  );
  return response.data;
};

export const createAssignment = async (courseId, assignment) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment,
  );
  return response.data;
};

export const updateAssignment = async (assignment) => {
  const response = await axiosWithCredentials.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment,
  );
  return response.data;
};

export const deleteAssignment = async (assignmentId) => {
  const response = await axiosWithCredentials.delete(
    `${ASSIGNMENTS_API}/${assignmentId}`,
  );
  return response.data;
};
