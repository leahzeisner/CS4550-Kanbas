import {
  FaArrowCircleRight,
  FaBook,
  FaBullhorn,
  FaBullseye,
  FaCalendar,
  FaCheckSquare,
  FaCircle,
  FaClipboard,
  FaClock,
  FaComments,
  FaFileAlt,
  FaFolderOpen,
  FaHome,
  FaInbox,
  FaLaptop,
  FaPencilAlt,
  FaPlug,
  FaQuestionCircle,
  FaRegCalendarAlt,
  FaRegUserCircle,
  FaRocket,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

export const API_BASE = process.env.REACT_APP_API_BASE;
export const COURSES_API = `${API_BASE}/api/courses`;
export const MODULES_API = `${API_BASE}/api/modules`;

export const courseNavLinks = [
  {
    label: "Home",
    icon: <FaHome></FaHome>,
  },
  {
    label: "Modules",
    icon: <FaHome></FaHome>,
  },
  {
    label: "Piazza",
    icon: <FaPlug></FaPlug>,
  },
  {
    label: "Zoom Meetings",
    icon: <FaPlug></FaPlug>,
  },
  {
    label: "Assignments",
    icon: <FaPencilAlt></FaPencilAlt>,
  },
  {
    label: "Quizzes",
    icon: <FaRocket></FaRocket>,
  },
  {
    label: "Grades",
    icon: <FaCheckSquare></FaCheckSquare>,
  },
  {
    label: "People",
    icon: <FaUsers></FaUsers>,
  },
  {
    label: "Panopto Video",
    icon: <FaPlug></FaPlug>,
  },
  { label: "Discussions", icon: <FaComments></FaComments> },
  { label: "Announcements", icon: <FaBullhorn></FaBullhorn> },
  { label: "Pages", icon: <FaFileAlt></FaFileAlt> },
  { label: "Files", icon: <FaFolderOpen></FaFolderOpen> },
  { label: "Rubrics", icon: <FaClipboard></FaClipboard> },
  { label: "Outcomes", icon: <FaBullseye></FaBullseye> },
  { label: "Collaborations", icon: <FaCircle></FaCircle> },
  { label: "Syllabus", icon: <FaCalendar></FaCalendar> },
  { label: "Settings", icon: <FaGear></FaGear> },
];

export const getKanbasLinks = (iconClass: string, accountId: string) => {
  return [
    {
      label: "Account",
      icon: <FaRegUserCircle className={iconClass} id={accountId} />,
    },
    {
      label: "Dashboard",
      icon: <FaTachometerAlt className={iconClass} />,
    },
    { label: "Courses", icon: <FaBook className={iconClass} /> },
    {
      label: "Calendar",
      icon: <FaRegCalendarAlt className={iconClass} />,
    },
    { label: "Inbox", icon: <FaInbox className={iconClass} /> },
    { label: "History", icon: <FaClock className={iconClass} /> },
    { label: "Studio", icon: <FaLaptop className={iconClass} /> },
    {
      label: "Commons",
      icon: <FaArrowCircleRight className={iconClass} />,
    },
    {
      label: "Help",
      icon: <FaQuestionCircle className={iconClass} />,
    },
  ];
};
