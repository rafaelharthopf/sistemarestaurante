export type Company = {
  id: number;
  name: string;
  isActive: number;
};

export async function fetchCompanies(): Promise<Company[]> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const res = await fetch('https://api-sistema-restaurante.onrender.com/companies', {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': '65b34eab8b65512dfe5807d654cd9c3e1a72cf06f7a8841c573a28ee3a292de5'
    },
  });

  if (!res.ok) throw new Error('Erro ao buscar empresas');
  return res.json();
}

export async function createCompany(name: string): Promise<Company> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const res = await fetch('https://api-sistema-restaurante.onrender.com/companies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': '65b34eab8b65512dfe5807d654cd9c3e1a72cf06f7a8841c573a28ee3a292de5'
    },
    body: JSON.stringify({
      name,
      isActive: true,
    }),
  });

  if (!res.ok) throw new Error('Erro ao criar empresa');
  return res.json();
}

export async function updateCompany(id: number, data: Partial<Company>): Promise<Company> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const res = await fetch(`https://api-sistema-restaurante.onrender.com/companies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': '65b34eab8b65512dfe5807d654cd9c3e1a72cf06f7a8841c573a28ee3a292de5'
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Erro ao atualizar empresa');
  return res.json();
}
