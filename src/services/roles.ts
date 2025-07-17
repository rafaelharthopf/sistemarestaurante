export type Role = {
  id: number;
  name: string;
};

export async function fetchRoles(): Promise<Role[]> {
  const res = await fetch('https://api-sistema-restaurante.onrender.com/roles', {
    cache: 'no-store',
    headers: { 
      'Content-Type': 'application/json',
      'x-api-key': '65b34eab8b65512dfe5807d654cd9c3e1a72cf06f7a8841c573a28ee3a292de5'
    },
   });
  if (!res.ok) throw new Error('Erro ao buscar cargos');
  return res.json();
}
