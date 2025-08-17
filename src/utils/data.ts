import { CheckCircle, ClipboardList, LayoutDashboard, ListChecks, Loader2, Trash2, Users } from "lucide-react";
import type { SidebarItem } from "./types";

export const sidebarItems:SidebarItem [] = [
  {
    label: "Dashboard",
    Icon: LayoutDashboard,
    path: "/",
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
    path: "/trash",
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
  "Entrepreneur"
];
