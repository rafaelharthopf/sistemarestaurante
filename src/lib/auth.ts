import { users } from '@/mock/users';

let currentUser: any = null;

export function login(email: string) {
  const user = users.find((u) => u.email === email);
  currentUser = user || null;
  return currentUser;
}

export function getCurrentUser() {
  return currentUser;
}

export function logout() {
  currentUser = null;
}