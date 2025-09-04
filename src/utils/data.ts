import { Status } from "@/utils/types";
import {
  CheckCircle,
  CheckCircle2,
  ClipboardList,
  LayoutDashboard,
  ListChecks,
  ListTodo,
  Loader2,
  Trash2,
  Users,
  type LucideProps,
} from "lucide-react";
import type { SidebarItem } from "./types";

export const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    Icon: LayoutDashboard,
    path: "",
  },
  {
    label: "Tasks",
    Icon: ListChecks,
    path: "/tasks",
  },
  {
    label: "Completed",
    Icon: CheckCircle,
    path: "/tasks/completed",
  },
  {
    label: "In Progress",
    Icon: Loader2,
    path: "/tasks/in-progress",
  },
  {
    label: "To Do",
    Icon: ClipboardList,
    path: "/tasks/todo",
  },
  {
    label: "Team",
    Icon: Users,
    path: "/team",
  },
  {
    label: "Trash",
    Icon: Trash2,
    path: "/tasks/trash",
  },
];
export const userTitles: string[] = [
  "Web Developer",
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "UI/UX Designer",
  "Graphic Designer",
  "Product Manager",
  "Project Manager",
  "Team Lead",
  "Software Engineer",
  "Mobile Developer",
  "QA Engineer / Tester",
  "Data Analyst",
  "Data Scientist",
  "DevOps Engineer",
  "Content Creator",
  "Marketing Specialist",
  "Business Analyst",
  "HR Manager",
  "Student",
  "Freelancer",
  "Entrepreneur",
];

export const statusColors: Record<string, string> = {
  completed: "#388e3c",
  "in-progress": "#FACC15",
  todo: "#60A5FA",
};

export const taskColumns = [
  { key: "title", label: "Title" },
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
  { key: "assignedTo", label: "Assigned To" },
  { key: "dueDate", label: "Due Date" },
  { key: "createdAt", label: "Created At" },
  { key: "actions", label: "Actions" },
];

export const COLUMNS: {
  id: Status;
  title: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  className: string;
}[] = [
  {
    id: Status.Todo,
    title: "Todo",
    Icon: ListTodo,
    className: "bg-sky-50 dark:bg-sky-900/40 text-sky-800 dark:text-sky-300 shadow-sky-800/20",
  },
  {
    id: Status.Inprogress,
    title: "In Progress",
    Icon: Loader2,
    className: "bg-yellow-50 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 shadow-yellow-800/20",
  },
  {
    id: Status.Completed,
    title: "Done",
    Icon: CheckCircle2,
    className: "bg-green-50 dark:bg-green-900/40 text-green-800 dark:text-green-300 shadow-green-800/20",
  },
];
