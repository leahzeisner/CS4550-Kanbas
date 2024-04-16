import axios from "axios";
import { COURSES_API } from "../../constants";

export const findCourseAssignments = async (courseId) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};
