import { useEffect } from "react";

const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title ? `${title} — Idderf Salem` : "Idderf Salem — Full Stack Developer";
  }, [title]);
};

export default usePageTitle;
