export type Company = {
  id: number;
  name: string;
  isActive: number;
};

const API_URL = process.env.NEXT_PUBLIC_URL_PROD!;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

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
      const text = await res.text();
      if (text) errorMessage += ` - ${text}`;
    }

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
