import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export default api;

export async function fetcher(url: string) {
  const resp = await api.get(url);
  return resp.data;
}

export const fetchers = {};
