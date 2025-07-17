'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, Ban, Pencil } from 'lucide-react';
import { fetchMenuItems, createMenuItem, MenuItem } from '@/services/menu';

export default function MenuPage() {
  const router = useRouter();
  const user = getCurrentUser();

  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    available: true,
  });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allowedRolesToCreate = [1, 2, 3];
  const canCreate = user && allowedRolesToCreate.includes(user.roleId);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const loadMenu = async () => {
      try {
        const items = await fetchMenuItems();
        const filtered = items.filter(item => item.companyId === user.companyId);
        setMenu(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;

    const { name, value, type } = target;
    const checked = target.checked;

    setNewItem(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'price' ? Number(value) : value),
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!user) return;

    setCreating(true);
    try {
      const created = await createMenuItem({ ...newItem, companyId: user.companyId });
      setMenu(prev => [...prev, created]);
      setNewItem({ name: '', description: '', price: 0, category: '', available: true });
    } catch (err) {
      setError('Erro ao criar item do menu');
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Carregando cardápio...</p>;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Cardápio</h1>
          <p className="text-gray-600 mb-8">Gerencie os itens disponíveis no restaurante.</p>

          {canCreate && (
            <form onSubmit={handleCreate} className="mb-10 p-6 bg-black rounded-xl shadow border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Adicionar novo item</h2>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={newItem.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Descrição</label>
                <textarea
                  name="description"
                  value={newItem.description}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Preço (R$)</label>
                <input
                  type="number"
                  name="price"
                  value={newItem.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Categoria</label>
                <input
                  type="text"
                  name="category"
                  value={newItem.category}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  name="available"
                  checked={newItem.available}
                  onChange={handleChange}
                  id="available-checkbox"
                  className="mr-2"
                />
                <label htmlFor="available-checkbox" className="font-medium">Disponível</label>
              </div>

              {error && <p className="mb-4 text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={creating}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {creating ? 'Criando...' : 'Adicionar item'}
              </button>
            </form>
          )}

          {/* Listagem dos itens do menu */}
          {menu.length === 0 ? (
            <p className="text-gray-500">Nenhum item de cardápio encontrado para esta empresa.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menu.map(item => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between"
                >
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                      <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    <p className="text-gray-800 font-medium text-lg">R$ {item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full flex items-center ${item.available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {item.available ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Disponível
                        </>
                      ) : (
                        <>
                          <Ban className="w-4 h-4 mr-1" />
                          Indisponível
                        </>
                      )}
                    </span>

                    <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                      <Pencil className="w-4 h-4 mr-1" />
                      Editar
                    </button>
                  </div>
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
