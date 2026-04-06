import { useEffect, useState } from "react";

export interface GalleryItem {
  id: number;
  filename: string;
  description: string;
  order: number;
  active: boolean;
  createdAt: string;
}

export function useGallery(): { items: GalleryItem[]; isLoading: boolean } {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/gallery.json");
        if (res.ok) {
          const data = await res.json();
          setItems(data);
          return;
        }
      } catch {
        // fall through to API
      }
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          setItems(data);
        }
      } catch {
        // ignore
      } finally {
        setIsLoading(false);
      }
      setIsLoading(false);
    }
    load();
  }, []);

  return { items, isLoading };
}
