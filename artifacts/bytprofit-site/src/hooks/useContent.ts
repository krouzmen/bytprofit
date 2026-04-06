import { useQuery } from "@tanstack/react-query";
import { useListContent } from "@workspace/api-client-react";

type ContentItem = { key: string; value: string; page: string };

function useContentJson() {
  return useQuery<ContentItem[] | null>({
    queryKey: ["content-json"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.BASE_URL}content.json`);
      if (!res.ok) return null;
      return res.json() as Promise<ContentItem[]>;
    },
    staleTime: Infinity,
    retry: false,
  });
}

export function useContent(page: string, defaults: Record<string, string>) {
  const { data: jsonData, isSuccess: jsonLoaded } = useContentJson();
  const { data: apiData } = useListContent({
    query: { enabled: jsonLoaded && jsonData === null, retry: false },
  });

  const map: Record<string, string> = { ...defaults };

  const source: ContentItem[] =
    jsonData ?? (Array.isArray(apiData) ? apiData : []);

  for (const item of source) {
    if (item.page === page) map[item.key] = item.value;
  }

  return map;
}
