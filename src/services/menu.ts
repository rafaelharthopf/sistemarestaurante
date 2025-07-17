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
  const res = await fetch('https://api-sistema-restaurante.onrender.com/menu', {
    headers: { 
      'Content-Type': 'application/json',
      'x-api-key': '65b34eab8b65512dfe5807d654cd9c3e1a72cf06f7a8841c573a28ee3a292de5'
    },
  });
  if (!res.ok) throw new Error('Erro ao buscar menu');
  return res.json();
}

export async function createMenuItem(data: Omit<MenuItem, 'id'>): Promise<MenuItem> {
  const res = await fetch('https://api-sistema-restaurante.onrender.com/menu', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'x-api-key': '65b34eab8b65512dfe5807d654cd9c3e1a72cf06f7a8841c573a28ee3a292de5'
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao criar item do menu');
  return res.json();
}
