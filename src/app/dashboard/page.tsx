'use client';

import { getCurrentUser } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { companies } from '@/mock/companies';
import Navbar from '@/components/Navbar';
import { ChefHat, ClipboardList, Utensils, Users, FileBarChart2, Settings } from 'lucide-react';
import Footer from '@/components/Footer'

export default function DashboardPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      const company = companies.find((c) => c.id === user.companyId);
      setCompanyName(company?.name || '');
    }
  }, [user, router]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Bem-vindo, {user?.name}
          </h1>
          <p className="text-gray-600 mb-8">
            Gerenciando restaurante: <span className="font-semibold">{companyName}</span>
          </p>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card 
              icon={<ClipboardList />} 
              title="Pedidos" 
              description="Visualize, gerencie e acompanhe os pedidos em tempo real."
              onClick={() => router.push('/dashboard/orders')}
            />
            <Card 
              icon={<ChefHat />} 
              title="Cozinha" 
              description="Painel da cozinha separado por estação e status."
              onClick={() => router.push('/dashboard/kitchen')}
            />
            <Card 
              icon={<Utensils />} 
              title="Cardápio" 
              description="Gerencie os pratos, preços e categorias."
              onClick={() => router.push('/dashboard/menu')}
            />
            <Card 
              icon={<Users />} 
              title="Usuários" 
              description="Controle os funcionários que têm acesso ao sistema."
              onClick={() => router.push('/dashboard/users')}
            />
            <Card 
              icon={<FileBarChart2 />} 
              title="Relatórios" 
              description="Veja estatísticas de vendas, pratos mais vendidos e mais."
              onClick={() => router.push('/dashboard/reports')}
            />
            <Card 
              icon={<Settings />} 
              title="Configurações" 
              description="Configure preferências da sua empresa e horários."
              onClick={() => router.push('/dashboard/settings')}
            />
          </div>
        </div>
        
      </main> 
      
      <Footer />
    </>
  );
}

function Card({ icon, title, description, onClick }: { icon: React.ReactNode, title: string, description: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 text-left w-full"
      type="button"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <p className="text-gray-600">{description}</p>
    </button>
  );
}
