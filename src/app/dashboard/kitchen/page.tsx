'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import { orders } from '@/mock/orders';
import { CookingPot, CheckCircle, Timer } from 'lucide-react';

export default function KitchenPage() {
  const router = useRouter();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  const statusColumns = [
    { label: 'Em preparo', icon: <CookingPot className="w-4 h-4 mr-1" />, color: 'bg-yellow-100' },
    { label: 'Pronto', icon: <CheckCircle className="w-4 h-4 mr-1" />, color: 'bg-green-100' },
    { label: 'Entregue', icon: <span className="mr-1">✅</span>, color: 'bg-gray-200' },
  ];

  const filteredOrders = orders.filter((order) => order.companyId === user?.companyId);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Painel da Cozinha</h1>
          <p className="text-gray-600 mb-8">Acompanhe o status de preparo dos pedidos em tempo real.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statusColumns.map(({ label, icon, color }) => {
              const filtered = filteredOrders.filter((order) => order.status === label);

              return (
                <div key={label} className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <span className={`mr-2 ${color} px-2 py-1 rounded-full text-sm flex items-center`}>
                      {icon}
                      {label}
                    </span>
                  </h2>

                  {filtered.length === 0 ? (
                    <p className="text-gray-400 italic">Nenhum pedido</p>
                  ) : (
                    filtered.map((order) => (
                      <div key={order.id} className="border rounded-lg p-3 mb-4 bg-gray-50">
                        <p className="font-semibold text-gray-800">{order.table}</p>
                        <ul className="text-sm text-gray-600 mb-2">
                          {order.items.map((item, idx) => (
                            <li key={idx}>• {item}</li>
                          ))}
                        </ul>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Timer className="w-4 h-4 mr-1" /> {order.createdAt}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-gray-500">
        © 2025 Sistema Empresarial • Solução completa e profissional para gestão moderna de restaurantes
      </footer>
    </>
  );
}
