import axios from "axios";
import { COURSES_API, QUIZZES_API } from "../../constants";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const findCourseQuizzes = async (courseId) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/quizzes`,
  );
  return response.data;
};

export const findQuizById = async (quizId) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const createQuiz = async (courseId, quiz) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz,
  );
  return response.data;
};

export const updateQuiz = async (quiz) => {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz,
  );
  return response.data;
};

export const deleteQuiz = async (quizId) => {
  const response = await axiosWithCredentials.delete(
    `${ASSIGNMENTS_API}/${quizId}`,
  );
  return response.data;
};
