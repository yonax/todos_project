export function fetchAll() {
  return fetch('/api/tasks/', {
    method: 'GET',
    headers: new Headers({
      'Content-type': 'application/json'
    }),
  })
  .then(response => response.json());
}

export function create(card, text) {
  return fetch('/api/tasks/', {
      method: 'POST',
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      body: JSON.stringify({ text, card })
    })
    .then(response => response.json())
}

export function toggle(id, done) {
  return fetch(`/api/tasks/${id}/`, {
    method: 'PATCH',
    headers: new Headers({
      'Content-type': 'application/json'
    }),
    body: JSON.stringify({ done })
  })
  .then(response => response.json())
}

export function remove(id) {
  return fetch(`/api/tasks/${id}/`, {
    method: 'DELETE',
    headers: new Headers({
      'Content-type': 'application/json'
    }),
  })
}
