import CONFIG from "../config";

const ENDPOINTS = {
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  STORIES: `${CONFIG.BASE_URL}/stories`,
};

export async function register({ name, email, password }) {
  const res = await fetch(ENDPOINTS.REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  return { ...data, ok: res.ok };
}

export async function login({ email, password }) {
  try {
    const res = await fetch(ENDPOINTS.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!res.ok) {
      return { error: true, message: json.message || "Login gagal" };
    }
    return { error: false, loginResult: json.loginResult };
  } catch {
    return { error: true, message: "Terjadi kesalahan jaringan" };
  }
}

export async function getAllStories(token) {
  const res = await fetch(`${ENDPOINTS.STORIES}?location=1`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Gagal mengambil data stories");
  }
  return res.json();
}

export async function addStory({ photo, lat, lon, description }) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("photo", dataURItoBlob(photo));
  formData.append("lat", lat);
  formData.append("lon", lon);
  formData.append("description", description);

  const res = await fetch(ENDPOINTS.STORIES, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return res.json();
}

function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].match(/:(.*?);/)[1];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}
