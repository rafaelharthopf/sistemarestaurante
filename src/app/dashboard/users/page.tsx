'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import { users } from '@/mock/users';
import Footer from '@/components/Footer'

type User = {
  id: number;
  name: string;
  email: string;
  companyId: number;
  isAdmin?: boolean;
};

export default function UsersPage() {
  const router = useRouter();
  const user = getCurrentUser();
  const [companyUsers, setCompanyUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    const filteredUsers = users.filter(u => u.companyId === user.companyId);
    setCompanyUsers(filteredUsers);
  }, [user]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Usuários</h1>
          <p className="text-gray-600 mb-8">Gerencie os usuários da empresa.</p>

          <div className="space-y-4">
            {companyUsers.length === 0 ? (
              <p className="text-gray-500 italic">Nenhum usuário cadastrado para sua empresa.</p>
            ) : (
              companyUsers.map(({ id, name, email, isAdmin }) => (
                <div
                  key={id}
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{name}</p>
                    <p className="text-gray-600 text-sm">{email}</p>
                    <p className="text-gray-600 text-sm italic">{isAdmin ? 'Administrador' : 'Funcionário'}</p>
                  </div>

                  <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                    Editar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
