export const apiFetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
