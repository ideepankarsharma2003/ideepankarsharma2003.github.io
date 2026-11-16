import { useEffect, useRef } from "react";
import resume from "../data/resume.json";

export default function Resume() {
  const content = useRef(null);
  useEffect(() => {
    const button = content.current?.querySelector(".js-print-resume");
    const print = () => window.print();
    button?.addEventListener("click", print);
    return () => button?.removeEventListener("click", print);
  }, []);
  return (
    <main
      id="main"
      className="wrap resume-page"
      ref={content}
      dangerouslySetInnerHTML={{ __html: resume }}
    />
  );
}
