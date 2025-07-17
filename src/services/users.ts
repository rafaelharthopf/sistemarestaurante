
export type User1 = {
  id: number;
  name: string;
  email: string;
  companyId: number;
  isAdmin?: boolean;
  password: string;
};
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;
export async function fetchUsers(): Promise<User1[]> {
  const res = await fetch('https://api-sistema-restaurante.onrender.com/users', { 
    cache: 'no-store',
    headers: { 
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
  });
  if (!res.ok) throw new Error('Erro ao buscar usuários');
  return res.json();
}
