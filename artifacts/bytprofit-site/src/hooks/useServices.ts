import { useQuery } from "@tanstack/react-query";
import { useListServices, useListAllServices } from "@workspace/api-client-react";
import type { Service } from "@workspace/api-client-react";

function useServicesJson() {
  return useQuery<Service[] | null>({
    queryKey: ["services-json"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.BASE_URL}services.json`);
      if (!res.ok) return null;
      return res.json() as Promise<Service[]>;
    },
    staleTime: Infinity,
    retry: false,
  });
}

export function useStaticServices() {
  const { data: jsonData, isSuccess: jsonLoaded } = useServicesJson();
  const { data: apiData, isLoading, error } = useListServices({
    query: { enabled: jsonLoaded && jsonData === null, retry: false },
  });

  if (jsonData !== undefined && jsonData !== null) {
    const active = jsonData.filter((s) => s.active);
    return { data: active, isLoading: false, error: null };
  }

  return {
    data: Array.isArray(apiData) ? apiData : [],
    isLoading: jsonLoaded ? isLoading : false,
    error: jsonLoaded ? error : null,
  };
}

export function useStaticAllServices() {
  const { data: jsonData, isSuccess: jsonLoaded } = useServicesJson();
  const { data: apiData, isLoading, error } = useListAllServices({
    query: { enabled: jsonLoaded && jsonData === null, retry: false },
  });

  if (jsonData !== undefined && jsonData !== null) {
    return { data: jsonData, isLoading: false, error: null };
  }

  return {
    data: Array.isArray(apiData) ? apiData : [],
    isLoading: jsonLoaded ? isLoading : false,
    error: jsonLoaded ? error : null,
  };
}
