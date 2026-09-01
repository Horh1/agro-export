import { useEffect, useState } from "react";

interface ContentItem {
  key: string;
  value: string;
}

export function useContent() {
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => {
        if (data.contents) {
          const map: Record<string, string> = {};
          data.contents.forEach((item: ContentItem) => {
            map[item.key] = item.value;
          });
          setContent(map);
        }
      })
      .catch(() => {});
  }, []);

  return content;
}
