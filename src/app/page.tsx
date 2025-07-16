'use client';

import { ChefHat, Store, ShieldCheck, Users, UtensilsCrossed } from 'lucide-react';

export default function HomePage() {
  return (
    <>
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col relative overflow-hidden text-gray-800">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23e2e8f0\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 z-0 pointer-events-none"></div>

      <header className="z-10 w-full flex items-center justify-between px-8 py-4 bg-white/80 shadow-sm backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Sistema de Restaurantes</h1>
        </div>
        <a
          href="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </a>
      </header>

      <section className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 space-y-12 md:space-y-0">
        <div className="max-w-xl">
          <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Plataforma Completa e Segura para Gestão de Restaurantes
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Controle integral de suas unidades, gestão de pedidos por estação, monitoramento de relatórios e gestão de equipes em um ambiente seguro, ágil e preparado para franquias e redes de qualquer porte. Reduza custos, aumente a produtividade e tenha uma visão completa do seu negócio em tempo real.
          </p>
          <a
            href="/login"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Acessar Sistema
          </a>
        </div>

        <div className="w-full md:w-[420px]">
          <img
            src="/globe.svg"
            alt="Restaurante"
            className="w-full max-w-sm mx-auto"
          />

        </div>
      </section>

      <section className="bg-white py-16 px-8 md:px-20 text-center">
        <h3 className="text-3xl font-bold mb-12 text-gray-800">Funcionalidades Avançadas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-left">
          <div className="flex items-start space-x-4">
            <Store className="text-blue-600 w-35 h-25" />
            <div>
              <h4 className="font-semibold text-lg">Multi-Empresas e Franquias</h4>
              <p className="text-sm text-gray-600">Gerencie diversas unidades de sua rede em um único painel intuitivo, garantindo controle unificado de dados, relatórios detalhados por loja e acompanhamento de desempenho individual ou consolidado de suas franquias em tempo real.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <UtensilsCrossed className="text-indigo-600 w-35 h-25" />
            <div>
              <h4 className="font-semibold text-lg">Gestão Avançada de Pedidos</h4>
              <p className="text-sm text-gray-600">Organize pedidos por setores (cozinha, drinks, sobremesas) e acompanhe cada etapa com precisão, melhorando o tempo de preparo e garantindo maior satisfação ao cliente em cada pedido realizado.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Users className="text-purple-600 w-35 h-25" />
            <div>
              <h4 className="font-semibold text-lg">Controle de Usuários e Permissões</h4>
              <p className="text-sm text-gray-600">Gerencie facilmente os acessos de garçons, cozinheiros, gerentes e administradores, configurando permissões personalizadas e garantindo segurança e rastreabilidade nas operações realizadas no sistema.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <ShieldCheck className="text-green-600 w-35 h-25" />
            <div>
              <h4 className="font-semibold text-lg">Segurança e Proteção de Dados</h4>
              <p className="text-sm text-gray-600">Ambiente seguro, com criptografia e separação de dados entre empresas, mantendo a confidencialidade das informações de cada unidade, garantindo conformidade com a LGPD e tranquilidade para o seu negócio crescer de forma sustentável.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
          <footer className="text-center py-6 text-sm text-gray-500">
        © 2025 Sistema Empresarial • Solução completa e profissional para gestão moderna de restaurantes
      </footer>
    </>
  );
}