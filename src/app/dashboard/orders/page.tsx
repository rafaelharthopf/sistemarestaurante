'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Clock4, CheckCircle, CookingPot } from 'lucide-react';
import classNames from 'classnames';
import { fetchOrders, createOrder, updateOrderStatus, Order, OrderStatus } from '@/services/orders';

export default function OrdersPage() {
  const router = useRouter();
  const user = getCurrentUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [table, setTable] = useState('');
  const [items, setItems] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    async function loadOrders() {
      try {
        const allOrders = await fetchOrders();
        const filtered = allOrders.filter(order => order.companyId === user.companyId);
        setOrders(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [router, user]);

  const handleCreateOrder = async () => {
    if (!table || !items) return;
    try {
      const newOrder = await createOrder({
        table,
        items: items.split(',').map(item => item.trim()),
        status: 'Em preparo',
        companyId: user.companyId,
      });
      setOrders(prev => [...prev, newOrder]);
      setTable('');
      setItems('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateStatus = async (order: Order) => {
  let nextStatus: OrderStatus;

  if (order.status === 'Em preparo') nextStatus = 'Pronto';
  else if (order.status === 'Pronto') nextStatus = 'Entregue';
  else return;

  try {
    console.log(`Atualizando pedido ${order.id} para status ${nextStatus}`);
    const updatedOrder = await updateOrderStatus(order.id, nextStatus);
    setOrders(prev => prev.map(o => (o.id === updatedOrder.id ? updatedOrder : o)));
  } catch (error) {
    console.error(error);
  }
};


  if (loading) return <p className="text-center mt-10">Carregando pedidos...</p>;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gray-800">Pedidos</h1>

          <div className="bg-black p-6 rounded-xl shadow space-y-4">
            <h2 className="text-lg font-semibold">Criar novo pedido</h2>
            <input
              type="text"
              placeholder="Mesa"
              value={table}
              onChange={e => setTable(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Itens (separados por vírgula)"
              value={items}
              onChange={e => setItems(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={handleCreateOrder}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Criar Pedido
            </button>
          </div>

          {orders.length === 0 ? (
            <p className="text-gray-800">Nenhum pedido encontrado para esta empresa.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {orders.map(order => (
                <div
                  key={order.id}
                  className="bg-black p-5 rounded-xl shadow space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{order.table}</span>
                    <span className="text-sm text-gray-300">
                      <Clock4 className="inline w-4 h-4 mr-1" />
                      {new Date(order.createdAt).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <ul className="text-sm text-gray-100">
                    {order.items.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleUpdateStatus(order)}
                    className={classNames(
                      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition',
                      {
                        'bg-yellow-100 text-yellow-800 hover:bg-yellow-200': order.status === 'Em preparo',
                        'bg-green-100 text-green-800 hover:bg-green-200': order.status === 'Pronto',
                        'bg-gray-200 text-gray-700': order.status === 'Entregue',
                      }
                    )}
                  >
                    {order.status === 'Em preparo' && <CookingPot className="w-4 h-4 mr-1" />}
                    {order.status === 'Pronto' && <CheckCircle className="w-4 h-4 mr-1" />}
                    {order.status === 'Entregue' && <span className="mr-1">✅</span>}
                    {order.status}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
