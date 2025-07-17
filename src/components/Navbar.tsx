'use client';

import { logout, getCurrentUser } from '@/lib/auth';
import { companies } from '@/mock/companies';
import { fetchCompanies, Company } from '@/services/companies';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChefHat } from 'lucide-react';

type User = {
  id: number;
  name: string;
  email: string;
  companyId: number;
  isAdmin?: boolean;
  roleId: number;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        router.replace('/login');
        return;
      }
      setUser(currentUser);

      try {
        const companies: Company[] = await fetchCompanies();
        const company = companies.find(c => Number(c.id) === Number(currentUser.companyId));
        setCompanyName(company?.name || '');
      } catch (error) {
        console.error('Erro ao carregar empresas:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [router]);

  function handleLogout() {
    logout();
    router.push('/login');
  }

  function goToDashboard() {
    router.push('/dashboard');
  }

  if (isLoading) {
    return (
      <nav className="z-10 w-full flex items-center justify-center px-8 py-4 bg-white/80 shadow-sm backdrop-blur-sm">
        Carregando...
      </nav>
    );
  }

  return (
    <nav className="z-10 w-full flex items-center justify-between px-8 py-4 bg-white/80 shadow-sm backdrop-blur-sm">
      <div
        onClick={goToDashboard}
        className="flex items-center space-x-3 cursor-pointer select-none hover:text-blue-600 transition-colors"
        title="Ir para o Dashboard"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
          <ChefHat className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-800">
          {companyName ? companyName : 'Sistema de Restaurantes'}
        </h1>
        {user && (
          <span className="text-gray-600 font-medium">— {user.name}</span>
        )}
      </div>
      {user && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Sair
        </button>
      )}
    </nav>
  );
}
