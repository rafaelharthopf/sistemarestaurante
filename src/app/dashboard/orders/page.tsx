'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import { orders } from '@/mock/orders';
import { Clock4, CheckCircle, CookingPot } from 'lucide-react';
import classNames from 'classnames';

export default function OrdersPage() {
  const router = useRouter();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  // Filtra os pedidos pela empresa do usuário
  const filteredOrders = orders.filter(order => order.companyId === user?.companyId);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Pedidos</h1>
          <p className="text-gray-600 mb-8">Acompanhe e gerencie os pedidos em tempo real.</p>

          {filteredOrders.length === 0 ? (
            <p className="text-gray-500">Nenhum pedido encontrado para esta empresa.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">{order.table}</h2>
                    <span className="text-sm text-gray-500">
                      <Clock4 className="inline-block w-4 h-4 mr-1" />
                      {order.createdAt}
                    </span>
                  </div>

                  <ul className="text-gray-700 text-sm space-y-1">
                    {order.items.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>

                  <span
                    className={classNames(
                      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                      {
                        'bg-yellow-100 text-yellow-800': order.status === 'Em preparo',
                        'bg-green-100 text-green-800': order.status === 'Pronto',
                        'bg-gray-200 text-gray-700': order.status === 'Entregue',
                      }
                    )}
                  >
                    {order.status === 'Em preparo' && <CookingPot className="w-4 h-4 mr-1" />}
                    {order.status === 'Pronto' && <CheckCircle className="w-4 h-4 mr-1" />}
                    {order.status === 'Entregue' && <span className="mr-1">✅</span>}
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-gray-500">
        © 2025 Sistema Empresarial • Solução completa e profissional para gestão moderna de restaurantes
      </footer>
    </>
  );
}
