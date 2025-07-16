// src/mock/companies.ts
export let companies = [
  { id: 1, name: 'Pizzaria do João' },
  { id: 2, name: 'Restaurante Bom Sabor' },
];

export function addCompany(name: string) {
  const newCompany = { id: companies.length + 1, name };
  companies = [...companies, newCompany];
  return newCompany;
}

export function updateCompany(id: number, data: { name: string; address: string; phone: string }) {
  const index = companies.findIndex(c => c.id === id);
  if (index !== -1) {
    companies[index] = { ...companies[index], ...data };
  }
}