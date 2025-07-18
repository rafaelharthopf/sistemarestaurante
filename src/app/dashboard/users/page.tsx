'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchUsers, User1 } from '@/services/users';
import { toast } from 'react-hot-toast';

export default function UsersPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [companyUsers, setCompanyUsers] = useState<User1[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      router.push('/login');
      return;
    }

    setUser(currentUser);

    async function loadUsers() {
      try {
        const allUsers = await fetchUsers();
        const filtered = allUsers.filter(u => u.companyId === currentUser.companyId);
        setCompanyUsers(filtered);
      } catch (error: any) {
        const message = error?.message || 'Erro ao buscar usuários.';
        toast.error(message);
        setCompanyUsers([]);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Carregando usuários...</p>;

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
