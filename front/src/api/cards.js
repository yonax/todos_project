export function fetchAll() {
  return fetch('/api/cards/', {
    method: 'GET',
    headers: new Headers({
      'Content-type': 'application/json'
    }),
  })
  .then(response => response.json());
}
