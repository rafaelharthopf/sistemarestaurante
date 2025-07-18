'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getCurrentUser } from '@/lib/auth';
import { fetchCompanies, createCompany, Company } from '@/services/companies';

export default function AdminPage() {
  const router = useRouter();
  const user = getCurrentUser();

  const [companyName, setCompanyName] = useState('');
  const [companyList, setCompanyList] = useState<Company[]>([]);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push('/login');
      return;
    }

    async function loadCompanies() {
      try {
        const companies = await fetchCompanies();
        setCompanyList(companies);
      } catch (error) {
        alert('Erro ao carregar empresas');
      }
    }

    loadCompanies();
  }, [user, router]);

  const handleAddCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      alert('Digite o nome da empresa');
      return;
    }

    try {
      const added = await createCompany(companyName.trim());
      setCompanyList((prev) => [...prev, added]);
      setCompanyName('');
    } catch (error) {
      alert('Erro ao cadastrar empresa');
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Painel Administrativo</h1>
          <p className="text-gray-500 mb-10">
            Gerencie empresas com permissões administrativas.
          </p>

          {/* Empresa */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Nova Empresa</h2>
            <form onSubmit={handleAddCompany} className="space-y-4">
              <input
                type="text"
                placeholder="Nome da empresa"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Cadastrar Empresa
              </button>
            </form>

            <div className="mt-6">
              <h3 className="font-medium text-gray-600 mb-2">Empresas cadastradas</h3>
              {companyList.length === 0 ? (
                <p className="text-gray-500 text-sm">Nenhuma empresa cadastrada ainda.</p>
              ) : (
                <ul className="list-disc list-inside text-gray-500 text-sm space-y-1">
                  {companyList.map((c) => (
                    <li key={c.id}>{c.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-gray-500">
        © 2025 Sistema Empresarial • Solução completa e profissional para gestão moderna de restaurantes
      </footer>
    </>
  );
}
