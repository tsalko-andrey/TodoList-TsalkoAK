export default async function Get(url, headers) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...headers,
        },
      });
      return response.json();
    } catch (e) {
      throw new Error(e);
    }
  }
  