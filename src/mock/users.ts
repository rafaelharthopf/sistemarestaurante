export let users = [
  { id: 1, name: 'João Garçom', email: 'joao@pizzaria.com', companyId: 1 },
  { id: 2, name: 'Rafael Dono', email: 'rafael@admin.com', companyId: 0, isAdmin: true },
  { id: 3, name: 'Lucas', email: 'lucas@restaurante.com', companyId: 2 }
];

type NewUser = {
  name: string;
  email: string;
  companyId: number;
  isAdmin?: boolean;
};


export function addUser(user: NewUser) {
  const newUser = { id: users.length + 1, ...user };
  users = [...users, newUser];
  return newUser;
}
