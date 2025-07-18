'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getCurrentUser } from '@/lib/auth';
import Footer from '@/components/Footer';
import { fetchCompanies, updateCompany } from '@/services/companies';
import { toast } from 'react-hot-toast';

export default function SettingsPage() {
  const router = useRouter();
  const user = getCurrentUser();

  const [companyId, setCompanyId] = useState<number | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!user || hasLoaded) return;

    const loadCompany = async () => {
      try {
        const companies = await fetchCompanies();
        const company = companies.find(c => c.id === user.companyId);

        if (!company) {
          toast.error('Empresa não encontrada.');
          router.push('/dashboard');
          return;
        }

        setCompanyId(company.id);
        setCompanyName(company.name || '');
      } catch (error: any) {
        const message = error?.message || 'Erro ao carregar dados da empresa.';
        toast.error(message);
      } finally {
        setLoading(false);
        setHasLoaded(true);
      }
    };

    loadCompany();
  }, [user, hasLoaded, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyId) {
      toast.error('Empresa não identificada.');
      return;
    }

    try {
      await updateCompany(companyId, { name: companyName });
      toast.success('Configurações salvas com sucesso!');
    } catch (error: any) {
      const message = error?.message || 'Erro ao salvar configurações.';
      toast.error(message);
    }
  };


  if (loading) {
    return <p className="text-center py-10">Carregando...</p>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Configurações da Empresa</h1>
          <p className="text-gray-600 mb-8">Atualize os dados da sua empresa cadastrada no sistema.</p>

          <form
            onSubmit={handleSave}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome da Empresa
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 text-gray-800"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="text-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow hover:shadow-lg"
              >
                Salvar Configurações
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
