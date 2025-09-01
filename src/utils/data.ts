import {
  CheckCircle,
  ClipboardList,
  LayoutDashboard,
  ListChecks,
  Loader2,
  Trash2,
  Users,
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
