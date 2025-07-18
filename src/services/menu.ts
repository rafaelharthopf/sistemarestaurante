export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  companyId: number;
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;
const URL_PROD = process.env.NEXT_PUBLIC_URL_PROD!;

export async function fetchMenuItems(): Promise<MenuItem[]> {
  const res = await fetch(`${URL_PROD}/menu`, {
    headers: { 
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
  });
  if (!res.ok) throw new Error('Erro ao buscar menu');
  return res.json();
}

export async function createMenuItem(data: Omit<MenuItem, 'id'>): Promise<MenuItem> {
  const res = await fetch(`${URL_PROD}/menu`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao criar item do menu');
  return res.json();
}
