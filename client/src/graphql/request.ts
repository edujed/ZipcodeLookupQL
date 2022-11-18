export function prepareRequest(query: string = 'query {}'): RequestInit {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({query}),
  };
}