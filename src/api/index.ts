import axios from "axios";
import useSWR from "swr";
import { RepoSearchResult } from "./type";

export const api = axios.create({
  baseURL: "https://api.github.com/search/",
  timeout: 1000,
  headers: {
    accept: "application/vnd.github+json",
  },
});

const intervalMs = 5000;

let lastInvocationTime: number = 0;

api.interceptors.request.use((config) => {
  const now = Date.now();

  if (lastInvocationTime > 0) {
    lastInvocationTime += intervalMs;
    const waitPeriodForThisRequest = lastInvocationTime - now;
    if (waitPeriodForThisRequest > 0) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(config), waitPeriodForThisRequest);
      });
    }
  }

  lastInvocationTime = now;
  return config;
});

const fetcher = (payload: { url: string; params?: object }) =>
  api.get(payload.url, { params: payload?.params }).then((res) => res.data);

interface getRepositoriesParameters {
  q: string;
}

export const getRepositories = async (params: getRepositoriesParameters) => {
  try {
    const { data } = await api.get<RepoSearchResult>("/repositories", {
      params,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export function useRepos(params: getRepositoriesParameters) {
  const { data, error } = useSWR<RepoSearchResult>(
    { url: "/repositories", params },
    fetcher
  );
  console.log(data, error);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
