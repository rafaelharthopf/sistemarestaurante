export let users = [
  { id: 1, name: 'João Garçom', email: 'joao@pizzaria.com', companyId: 1, roleId: 5 },
  { id: 2, name: 'Rafael Dono', email: 'rafael@admin.com', companyId: 0, isAdmin: true, roleId: 1 },
  { id: 3, name: 'Lucas', email: 'lucas@restaurante.com', companyId: 2, roleId: 4 },
  { id: 4, name: 'José', email: 'jose@restaurante.com', companyId: 3, roleId: 6 },
];

type NewUser = {
  name: string;
  email: string;
  companyId: number;
  roleId: number;
  isAdmin?: boolean;
};


export function addUser(user: NewUser) {
  const newUser = { id: users.length + 1, ...user };
  users = [...users, newUser];
  return newUser; 
}
