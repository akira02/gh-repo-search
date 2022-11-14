import { useState } from "react";
import axios from "axios";
import { RepoSearchResult } from "./type";

export const api = axios.create({
  baseURL: "https://api.github.com/search/",
  timeout: 100000,
  headers: {
    accept: "application/vnd.github+json",
  },
});

const intervalMs = 6000;

let lastInvocationTime = 0;
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

export interface getRepositoriesParameters {
  q: string;
  sort?: "stars" | "forks" | "help-wanted-issues" | "updated";
  order?: "asc" | "desc";
  per_page?: number;
  page?: number;
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
