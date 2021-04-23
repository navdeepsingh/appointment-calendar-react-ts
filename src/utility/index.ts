function fetchPromise(url: string, options = {}) {
  return window
    .fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    })
    .then(async (results) => {
      const data = await results.json();
      if (results.ok) {
        if (data) {
          return data;
        } else {
          return Promise.reject(new Error(`No appointments found"`));
        }
      } else {
        // handle the error
        const error = {
          message: data.message,
        };
        return Promise.reject(error);
      }
    });
}

export { fetchPromise };
