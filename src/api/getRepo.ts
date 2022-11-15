import { api } from "./";
import { RepoSearchResult } from "./type";

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
