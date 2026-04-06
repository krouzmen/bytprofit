import { useListContent } from "@workspace/api-client-react";

export function useContent(page: string, defaults: Record<string, string>) {
  const { data } = useListContent();

  const pageContent = data?.filter(c => c.page === page) ?? [];

  const map: Record<string, string> = { ...defaults };
  for (const block of pageContent) {
    map[block.key] = block.value;
  }

  return map;
}
