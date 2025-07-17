
export type User1 = {
  id: number;
  name: string;
  email: string;
  companyId: number;
  isAdmin?: boolean;
  password: string;
};

export async function fetchUsers(): Promise<User1[]> {
  const res = await fetch('https://api-sistema-restaurante.onrender.com/users', { cache: 'no-store' });
  if (!res.ok) throw new Error('Erro ao buscar usuários');
  return res.json();
}
