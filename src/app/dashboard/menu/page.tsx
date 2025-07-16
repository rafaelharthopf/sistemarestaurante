'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import { menu } from '@/mock/menu';
import { CheckCircle, Ban, Pencil } from 'lucide-react';

export default function MenuPage() {
  const router = useRouter();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  const filteredMenu = menu.filter(item => item.companyId === user?.companyId);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Cardápio</h1>
          <p className="text-gray-600 mb-8">Gerencie os itens disponíveis no restaurante.</p>

          {filteredMenu.length === 0 ? (
            <p className="text-gray-500">Nenhum item de cardápio encontrado para esta empresa.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMenu.map((item) => (
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
                      className={`text-sm font-medium px-3 py-1 rounded-full flex items-center ${
                        item.available
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
      <footer className="text-center py-6 text-sm text-gray-500">
        © 2025 Sistema Empresarial • Solução completa e profissional para gestão moderna de restaurantes
      </footer>
    </>
  );
}
