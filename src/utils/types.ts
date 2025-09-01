import type { LucideProps } from "lucide-react";

export type SidebarItem = {
  label: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  path: string;
};

export type User = {
  id?: string;
  name?: string;
  email: string;
  title?: string;
  password: string;
  avatar?: string;
};

export type Theme = "dark" | "light" | "system";
export type AuthButtonMood = {
  mode?: "login" | "register"; // 👈 which page we are on
};

export interface ApiErrorResponse {
  errors?: string[];
  message?: string;
}

export interface AuthState {
  message: string | null;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export enum Status {
  Todo = "todo",
  Inprogress = "in-progress",
  Completed = "completed",
}
export interface Task {
  _id?: string;
  title: string;
  description?: string;
  status: Status;
  priority: "low" | "medium" | "high";
  assignedTo?: string;
  dueDate: Date | undefined;
  tags?: string[];
  createdBy?: string;
  createdAt: Date;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  message: string | null;
}
