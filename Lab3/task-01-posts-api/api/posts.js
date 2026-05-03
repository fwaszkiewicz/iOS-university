const BASE_URL = "https://api.jsonplaceholder.dev";

async function handle(response) {
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText || ""}`.trim());
  }
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function fetchPosts() {
  const res = await fetch(`${BASE_URL}/posts`);
  return handle(res);
}

export async function fetchPost(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  return handle(res);
}

export async function fetchComments(postId) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  return handle(res);
}

export async function createPost({ title, body, userId }) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, userId: Number(userId) }),
  });
  return handle(res);
}

export async function deletePost(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText || ""}`.trim());
  }
  return true;
}
