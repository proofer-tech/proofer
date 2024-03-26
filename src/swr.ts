export const apiFetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => {
    try {
      if (res.ok) return res.json();
    } catch (e) {}

    try {
      return res.json().then((j) => {
        const error = new Error(j.message);
        // @ts-ignore
        error.info = j;
        // @ts-ignore
        error.status = res.status;
        throw error;
      });
    } catch (e) {}

    return res.text().then((text) => {
      const error = new Error(text);
      // @ts-ignore
      error.info = text;
      // @ts-ignore
      error.status = res.status;
      throw error;
    });
  });
