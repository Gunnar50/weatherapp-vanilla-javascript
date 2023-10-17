export function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve(coords);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
