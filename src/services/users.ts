
export type User1 = {
  id: number;
  name: string;
  email: string;
  companyId: number;
  isAdmin?: boolean;
  password: string;
};
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;
const URL_PROD = process.env.NEXT_PUBLIC_URL_PROD!;
export async function fetchUsers(): Promise<User1[]> {
  const res = await fetch(URL_PROD, { 
    cache: 'no-store',
    headers: { 
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
  });
  if (!res.ok) throw new Error('Erro ao buscar usuários');
  return res.json();
}
