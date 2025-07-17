import { users } from '@/mock/users';
import { companies } from '@/mock/companies';

let currentUser: any = null;

export function login(email: string) {
  const user = users.find((u) => u.email === email);

  if (!user) {
    return { user: null, error: 'USER_NOT_FOUND' };
  }

  if (user.companyId === 0 && user.isAdmin) {
    currentUser = user; 
    return { user, error: null };
  }

  const company = companies.find(c => c.id === user.companyId);

  if (!company || company.isActive !== 1) {
    return { user: null, error: 'INACTIVE_COMPANY' };
  }

  currentUser = user;
  return { user, error: null };
}



export function getCurrentUser() {
  return currentUser;
}

export function logout() {
  currentUser = null;
}
