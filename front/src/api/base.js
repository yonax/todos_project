const API_ROOT = '/api';
const BASIC_HEADERS = new Headers({
  'Content-type': 'application/json'
});

export const list = (resource) => {
  return fetch(`${API_ROOT}/${resource}/`, {
    method: 'GET',
    headers: BASIC_HEADERS
  })
  .then(response => response.json());
}

export const post = (resource, obj) => {
  return fetch(`${API_ROOT}/${resource}/`, {
    method: 'POST',
    headers: BASIC_HEADERS,
    body: JSON.stringify(obj)
  })
  .then(response => response.json());
}

export const patch = (resource, id, obj) => {
  return fetch(`${API_ROOT}/${resource}/${id}/`, {
    method: 'PATCH',
    headers: BASIC_HEADERS,
    body: JSON.stringify(obj)
  })
  .then(response => response.json());
}

export const remove = (resource, id) => {
  return fetch(`${API_ROOT}/${resource}/${id}/`, {
    method: 'DELETE',
    headers: BASIC_HEADERS,
  });
}
