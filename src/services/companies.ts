export type Company = {
  id: number;
  name: string;
  isActive: number;
};

const API_URL = 'https://api-sistema-restaurante.onrender.com';
const API_KEY = '65b34eab8b65512dfe5807d654cd9c3e1a72cf06f7a8841c573a28ee3a292de5';

function getAuthHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
}

async function handleResponse(res: Response, context: string) {
  if (!res.ok) {
    let errorMessage = `${context} - Código: ${res.status}`;

    try {
      const errorData = await res.json();
      errorMessage += ` - ${errorData.message || JSON.stringify(errorData)}`;
    } catch {
      // se não vier JSON
      const text = await res.text();
      if (text) errorMessage += ` - ${text}`;
    }

    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return res.json();
}

export async function fetchCompanies(): Promise<Company[]> {
  const res = await fetch(`${API_URL}/companies`, {
    cache: 'no-store',
    headers: getAuthHeaders(),
  });
  return handleResponse(res, 'Erro ao buscar empresas');
}

export async function createCompany(name: string): Promise<Company> {
  const res = await fetch(`${API_URL}/companies`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      name,
      isActive: true,
    }),
  });
  return handleResponse(res, 'Erro ao criar empresa');
}

export async function updateCompany(id: number, data: Partial<Company>): Promise<Company> {
  const res = await fetch(`${API_URL}/companies/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res, 'Erro ao atualizar empresa');
}
