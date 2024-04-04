import { Course, Courses } from "../types";
import { getFreshId } from "../utils";

export const getEmptyCourse = () => {
  return {
    _id: getFreshId(),
    name: "",
    number: "",
    startDate: "",
    endDate: "",
    term: "",
    image: "",
  };
};

const isValidFormField = (key: string, value: string) => {
  return value === "" ? key === "_id" || key === "image" : true;
};

export const validateCourseForm = (course: Course) => {
  const invalidFields = Object.entries(course).filter(
    ([key, value]) => !isValidFormField(key, value),
  );
  return invalidFields.length === 0;
};

export const fixCoursesDob = (courses: Courses) => {
  const updatedCourses = courses.map((c: Course) => fixCourseDob(c));
  return updatedCourses;
};

export const fixCourseDob = (course: Course) => {
  return {
    ...course,
    startDate: course.startDate.substring(0, 10),
    endDate: course.endDate.substring(0, 10),
  };
};
