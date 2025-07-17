export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  companyId: number;
}

export async function fetchMenuItems(): Promise<MenuItem[]> {
  const res = await fetch('https://api-sistema-restaurante.onrender.com/menu');
  if (!res.ok) throw new Error('Erro ao buscar menu');
  return res.json();
}

export async function createMenuItem(data: Omit<MenuItem, 'id'>): Promise<MenuItem> {
  const res = await fetch('https://api-sistema-restaurante.onrender.com/menu', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao criar item do menu');
  return res.json();
}
