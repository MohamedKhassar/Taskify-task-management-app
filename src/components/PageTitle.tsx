import { useEffect } from "react";

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  useEffect(() => {
    document.title = `${title} | Taskify`; // Add your app name here
  }, [title]);

  return null; // this component only sets the title, nothing to render
};

export default PageTitle;
