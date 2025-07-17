export type Company = {
  id: number;
  name: string;
  isActive: number;
};

export async function fetchCompanies(): Promise<Company[]> {
  const res = await fetch('https://api-sistema-restaurante.onrender.com/companies', { cache: 'no-store' });
  if (!res.ok) throw new Error('Erro ao buscar empresas');
  return res.json();
}


export async function createCompany(name: string): Promise<Company> {
  const res = await fetch('https://api-sistema-restaurante.onrender.com/companies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
  const res = await fetch(`https://api-sistema-restaurante.onrender.com/companies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Erro ao atualizar empresa');
  return res.json();
}
