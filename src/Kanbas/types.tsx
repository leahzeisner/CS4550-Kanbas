export interface User {
  _id: string;
  username: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
}

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
  _id: string;
  title: string;
  url: string;
};

export type Lessons = Lesson[];

export type Section = {
  _id: string;
  title: string;
  lessons: Lessons;
};

export type Sections = Section[];

export type Module = {
  _id: string;
  courseId: string;
  title: string;
  sections: Sections;
};

export type Modules = Module[];

export type TodoItem = {
  _id: string;
  courseId: string;
  title: string;
  url: string;
  points: string;
  number: number;
  due_date: string;
};

export type TodoList = TodoItem[];

export type ComingUpItem = {
  _id: string;
  courseId: string;
  title: string;
  section: string;
  date: string;
};

export type ComingUpList = ComingUpItem[];

export type Assignment = {
  _id: string;
  courseId: string;
  title: string;
  dueDate: string;
  points: string;
};

export type AssignmentsList = Assignment[];

// TEMP - UPDATE LATER
export enum QuestionType {
  MULTIPLE_CHOICE,
  TRUE_FALSE,
  FILL_IN_BLANKS,
}

export type Answer = {
  answerId: string;
  answer: string;
  isCorrect: boolean;
};

export type Answers = Answer[];

export type Question = {
  questionId: string;
  type: QuestionType;
  title: string;
  question: string;
  answers: Answers;
  points: string;
};

export type Questions = Question[];

export type Quiz = {
  _id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  availableDate: string;
  availableUntilDate: string;
  points: string;
  published: boolean;
  questions: Questions;
  quizType: string;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: string;
  multipleAttempts: boolean;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  showCorrectAnswers?: string;
};

export type Quizzes = Quiz[];
