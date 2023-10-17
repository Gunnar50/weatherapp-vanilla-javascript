export const get = (key) => {
  const data = localStorage.getItem(key);
  const res = Number(data);
  if (Number.isNaN(res)) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return data;
  }
};

export const set = (key, value) => {
  if ((!key || !value) && value !== 0) {
    return;
  }

  if (typeof value === "object") {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};
