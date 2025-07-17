
export type User1 = {
  id: number;
  name: string;
  email: string;
  companyId: number;
  isAdmin?: boolean;
  password: string;
};

export async function fetchUsers(): Promise<User1[]> {
  const res = await fetch('https://api-sistema-restaurante.onrender.com/users', { 
    cache: 'no-store',
    headers: { 
      'Content-Type': 'application/json',
      'x-api-key': '65b34eab8b65512dfe5807d654cd9c3e1a72cf06f7a8841c573a28ee3a292de5'
    },
  });
  if (!res.ok) throw new Error('Erro ao buscar usuários');
  return res.json();
}
