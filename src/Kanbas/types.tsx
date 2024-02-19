export type Course = {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  term: string;
  image: string;
};

export type Courses = Course[];

export type Lesson = {
  title: string;
  url: string;
};

export type Lessons = Lesson[];

export type Section = {
  title: string;
  lessons: Lessons;
};

export type Sections = Section[];

export type Module = {
  _id: string;
  title: string;
  course: string;
  sections: Sections;
};

export type Modules = Module[];

export type TodoItem = {
  _id: string;
  title: string;
  url: string;
  points: string;
  number: number;
  due_date: string;
};

export type TodoList = TodoItem[];

export type ComingUpItem = {
  _id: string;
  title: string;
  section: string;
  date: string;
};

export type ComingUpList = ComingUpItem[];

export type Assignment = {
  title: string;
  due_date: string;
  points: string;
  url: string;
};

export type AssignmentsList = Assignment[];

export type CourseAssignments = {
  _id: string;
  course: string;
  assignments: AssignmentsList;
};
