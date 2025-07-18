export type Role = {
  id: number;
  name: string;
};

const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;
const URL_PROD = process.env.NEXT_PUBLIC_URL_PROD!;

export async function fetchRoles(): Promise<Role[]> {
  const res = await fetch(`${URL_PROD}/roles`, {
    cache: 'no-store',
    headers: { 
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
   });
  if (!res.ok) throw new Error('Erro ao buscar cargos');
  return res.json();
}
