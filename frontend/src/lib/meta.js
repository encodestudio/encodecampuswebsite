import { useEffect } from "react";

export function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = `${title} | Encode Campus`;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
    return () => {
      document.title = "Encode Campus | Education Operating & Governance Platform";
    };
  }, [title, description]);
}
