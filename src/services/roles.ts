export type Role = {
  id: number;
  name: string;
};

export async function fetchRoles(): Promise<Role[]> {
  const res = await fetch('https://api-sistema-restaurante.onrender.com/roles', {
    cache: 'no-store',
    headers: { 
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string
    },
   });
  if (!res.ok) throw new Error('Erro ao buscar cargos');
  return res.json();
}
