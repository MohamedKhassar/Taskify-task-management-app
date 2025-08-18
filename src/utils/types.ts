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
  password:string;
}

export type Theme = "dark" | "light" | "system";