import axios from "axios";
import { COURSES_API, MODULES_API } from "../../constants";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const findCourseModules = async (courseId) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/modules`,
  );
  return response.data;
};

export const createModule = async (courseId, module) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module,
  );
  return response.data;
};

export const findModuleById = async (moduleId) => {
  const response = await axiosWithCredentials.get(`${MODULES_API}/${moduleId}`);
  return response.data;
};

export const deleteModule = async (moduleId) => {
  const response = await axiosWithCredentials.delete(
    `${MODULES_API}/${moduleId}`,
  );
  return response.data;
};

export const updateModule = async (module) => {
  const response = await axiosWithCredentials.put(
    `${MODULES_API}/${module._id}`,
    module,
  );
  return response.data;
};

export const createSection = async (module, section) => {
  const response = await axiosWithCredentials.post(
    `${MODULES_API}/${module._id}`,
    { module, section },
  );
  return response.data;
};

export const updateSection = async (module, section) => {
  const updatedModule = {
    ...module,
    sections: module.sections.map((s) =>
      s._id === section._id ? { ...s, ...section } : s,
    ),
  };
  return updateModule(updatedModule);
};

export const deleteSection = async (module, sectionId) => {
  const updatedModule = {
    ...module,
    sections: module.sections.filter((s) => s._id !== sectionId),
  };
  return updateModule(updatedModule);
};

export const createLesson = async (module, section, lesson) => {
  const response = await axiosWithCredentials.post(
    `${MODULES_API}/${module._id}/section/${section._id}`,
    { module, lesson },
  );
  return response.data;
};

export const updateLesson = async (module, sectionId, lesson) => {
  const updatedModule = {
    ...module,
    sections: module.sections.map((s) =>
      s._id === sectionId
        ? {
            ...s,
            lessons: s.lessons.map((l) =>
              l._id === lesson._id ? { ...l, ...lesson } : l,
            ),
          }
        : s,
    ),
  };
  return updateModule(updatedModule);
};

export const deleteLesson = async (module, sectionId, lessonId) => {
  const updatedModule = {
    ...module,
    sections: module.sections.map((s) =>
      s._id === sectionId
        ? {
            ...s,
            lessons: s.lessons.filter((l) => l._id !== lessonId),
          }
        : s,
    ),
  };
  return updateModule(updatedModule);
};
