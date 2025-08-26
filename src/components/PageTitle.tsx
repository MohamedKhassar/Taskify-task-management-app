import { useEffect } from "react";

const PageTitle = ({ title }: { title: string }) => {
  useEffect(() => {
    document.title = title ? `${title} | Taskify` : "Taskify"; // Add your app name here
  }, [title]);

  return null; // this component only sets the title, nothing to render
};

export default PageTitle;
