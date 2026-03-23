export function loadRemote(importFn, retries = 5, delay = 1000) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const attempt = () => {
      importFn()
        .then(resolve)
        .catch((err) => {
          attempts++;
          if (attempts >= retries) { reject(err); return; }
          console.warn(`Remote load attempt ${attempts} failed, retrying...`);
          setTimeout(attempt, delay);
        });
    };
    attempt();
  });
}