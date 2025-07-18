'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CookingPot, CheckCircle, Timer } from 'lucide-react';
import { fetchOrders, updateOrderStatus, Order, OrderStatus } from '@/services/orders';
import { toast } from 'react-hot-toast';

export default function KitchenPage() {
  const router = useRouter();
  const user = getCurrentUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const loadOrders = async () => {
      try {
        const allOrders = await fetchOrders();
        const filtered = allOrders.filter(order => order.companyId === user.companyId);
        setOrders(filtered);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          error.message ||
          'Erro ao carregar pedidos.';
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };


    loadOrders();
  }, [user, router]);

  const handleUpdateStatus = async (order: Order) => {
    let nextStatus: OrderStatus;

    if (order.status === 'Em preparo') nextStatus = 'Pronto';
    else if (order.status === 'Pronto') nextStatus = 'Entregue';
    else return;

    try {
      const updated = await updateOrderStatus(order.id, nextStatus);
      setOrders(prev => prev.map(o => (o.id === updated.id ? updated : o)));
      toast.success('Status do pedido atualizado com sucesso!');
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Erro ao atualizar status do pedido.';

      toast.error(message);
    }
  };

  const statusColumns = [
    { label: 'Em preparo', icon: <CookingPot className="w-4 h-4 mr-1" />, color: 'bg-yellow-100' },
    { label: 'Pronto', icon: <CheckCircle className="w-4 h-4 mr-1" />, color: 'bg-green-100' },
    { label: 'Entregue', icon: <span className="mr-1">✅</span>, color: 'bg-gray-200' },
  ];

  if (loading) return <p className="text-center mt-10">Carregando pedidos...</p>;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Painel da Cozinha</h1>
          <p className="text-gray-600 mb-8">Acompanhe o status de preparo dos pedidos em tempo real.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statusColumns.map(({ label, icon, color }) => {
              const filtered = orders.filter(order => order.status === label);

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
                    filtered.map(order => (
                      <button
                        key={order.id}
                        onClick={() => handleUpdateStatus(order)}
                        className="w-full text-left border rounded-lg p-3 mb-4 bg-gray-50 hover:bg-gray-100 transition"
                      >
                        <p className="font-semibold text-gray-800">{order.table}</p>
                        <ul className="text-sm text-gray-600 mb-2">
                          {order.items.map((item, idx) => (
                            <li key={idx}>• {item}</li>
                          ))}
                        </ul>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Timer className="w-4 h-4 mr-1" /> {new Date(order.createdAt).toLocaleString('pt-BR')}
                        </span>
                        <p className="text-xs text-gray-400 mt-1 italic">Clique para atualizar o status</p>
                      </button>
                    ))
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
