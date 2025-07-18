import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_URL_PROD!;;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password },
      {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;

    if (typeof window !== 'undefined') {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return { user: data.user, token: data.token };
  } catch (error: any) {
    const message =
      error.response?.data?.error ||
      error.message ||
      'Erro ao realizar login.';
    throw new Error(message);
  }
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null;

  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
