'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getCurrentUser } from '@/lib/auth';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import Footer from '@/components/Footer'

type VendaPorDia = {
  dia: string;
  vendas: number;
};

type PratoMaisVendido = {
  nome: string;
  vendas: number;
};

const cores = ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC'];

export default function ReportsPage() {
  const router = useRouter();
  const [vendasPorDia, setVendasPorDia] = useState<VendaPorDia[]>([]);
  const [pratosMaisVendidos, setPratosMaisVendidos] = useState<PratoMaisVendido[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const companyId = 1;

      try {
        const res = await fetch(`https://api-sistema-restaurante.onrender.com/reports/${companyId}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': '65b34eab8b65512dfe5807d654cd9c3e1a72cf06f7a8841c573a28ee3a292de5'
          }
        });
        if (!res.ok) {
          console.error('Erro ao buscar relatórios');
          return;
        }

        const data = await res.json();
        setVendasPorDia(data.vendasPorDia);
        setPratosMaisVendidos(data.pratosMaisVendidos);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Relatórios</h1>
          <p className="mb-8 text-gray-600">
            Veja abaixo o resumo visual das vendas e dos pratos mais populares da sua empresa.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Vendas por dia</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={vendasPorDia}>
                  <XAxis dataKey="dia" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="vendas" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Pratos mais vendidos</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pratosMaisVendidos}
                    dataKey="vendas"
                    nameKey="nome"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name }) => name}
                  >
                    {pratosMaisVendidos.map((_, i) => (
                      <Cell key={i} fill={cores[i % cores.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
