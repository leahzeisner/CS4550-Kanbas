import axios from "axios";
export const COURSES_API = "http://localhost:4000/api/courses";
export const MODULES_API = "http://localhost:4000/api/modules";

export const findCourseModules = async (courseId) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModule = async (courseId, module) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module,
  );
  return response.data;
};

export const deleteModule = async (moduleId) => {
  const response = await axios.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

export const updateModule = async (module) => {
  const response = await axios.put(`${MODULES_API}/${module._id}`, module);
  return response.data;
};

export const updateSection = async (moduleId, section) => {
  const response = await axios.put(
    `${MODULES_API}/${moduleId}/section/${section._id}`,
    section,
  );
  return response.data;
};

export const deleteSection = async (moduleId, section) => {
  const response = await axios.delete(
    `${MODULES_API}/${moduleId}/section/${section._id}`,
    section,
  );
  return response.data;
};

export const updateLesson = async (moduleId, sectionId, lesson) => {
  const response = await axios.put(
    `${MODULES_API}/${moduleId}/section/${sectionId}/lesson/${lesson._id}`,
    lesson,
  );
  return response.data;
};

export const deleteLesson = async (moduleId, sectionId, lesson) => {
  const response = await axios.delete(
    `${MODULES_API}/${moduleId}/section/${sectionId}/lesson/${lesson._id}`,
    lesson,
  );
  return response.data;
};
