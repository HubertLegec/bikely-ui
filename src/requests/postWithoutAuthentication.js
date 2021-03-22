export async function postWithoutAuthentication(url, values) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const result = await response.json();
  if (!response.ok) response.error = true;
  return result;
}
