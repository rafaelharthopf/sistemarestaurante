'use client';

import { getCurrentUser } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChefHat, ClipboardList, Utensils, Users, FileBarChart2, Settings } from 'lucide-react';
import { getPermissionsByRoleId } from '@/lib/permissions';
import { fetchCompanies, Company } from '@/services/companies';
import { fetchRoles, Role } from '@/services/roles';

export default function DashboardPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const user = getCurrentUser();
      console.log('User completo:', user);
      if (!user) {
        router.replace('/login');
        return;
      }

      try {
        const companies: Company[] = await fetchCompanies();
        const company = companies.find(c => Number(c.id) === Number(user.companyId));
        setCompanyName(company?.name || '');

        const rolesData: Role[] = await fetchRoles();
        setRoles(rolesData);

        const rolePermissions = getPermissionsByRoleId(user.roleId);
        setPermissions(rolePermissions);

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  const user = getCurrentUser();

  const userRoleName = roles.find(r => Number(r.id) === Number(user?.roleId))?.name || 'Sem função';
  console.log('Roles:', roles);
console.log('User roleId:', user?.roleId);



  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Bem-vindo, {user?.name} ({userRoleName})
          </h1>
          <p className="text-gray-600 mb-8">
            Gerenciando restaurante: <span className="font-semibold">{companyName}</span>
          </p>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {permissions.includes('orders') && (
              <Card
                icon={<ClipboardList />}
                title="Pedidos"
                description="Visualize, gerencie e acompanhe os pedidos em tempo real."
                onClick={() => router.push('/dashboard/orders')}
              />
            )}
            {permissions.includes('kitchen') && (
              <Card
                icon={<ChefHat />}
                title="Cozinha"
                description="Painel da cozinha separado por estação e status."
                onClick={() => router.push('/dashboard/kitchen')}
              />
            )}
            {permissions.includes('menu') && (
              <Card
                icon={<Utensils />}
                title="Cardápio"
                description="Gerencie os pratos, preços e categorias."
                onClick={() => router.push('/dashboard/menu')}
              />
            )}
            {permissions.includes('users') && (
              <Card
                icon={<Users />}
                title="Usuários"
                description="Controle os funcionários que têm acesso ao sistema."
                onClick={() => router.push('/dashboard/users')}
              />
            )}
            {permissions.includes('reports') && (
              <Card
                icon={<FileBarChart2 />}
                title="Relatórios"
                description="Veja estatísticas de vendas, pratos mais vendidos e mais."
                onClick={() => router.push('/dashboard/reports')}
              />
            )}
            {permissions.includes('settings') && (
              <Card
                icon={<Settings />}
                title="Configurações"
                description="Configure preferências da sua empresa e horários."
                onClick={() => router.push('/dashboard/settings')}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Card({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 text-left w-full"
      type="button"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">{icon}</div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <p className="text-gray-600">{description}</p>
    </button>
  );
}
