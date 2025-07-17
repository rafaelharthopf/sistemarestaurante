'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Eye, EyeOff, Mail, Lock, ChefHat, User, Shield } from 'lucide-react';
import Footer from '@/components/Footer';

const API_URL = 'https://api-sistema-restaurante.onrender.com';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [roleId, setRoleId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  const handleRegister = async () => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    if (!name || !email || !password || !companyId || !roleId) {
      setError('Preencha todos os campos obrigatórios.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/users`, {
        name,
        email,
        companyId: Number(companyId),  
        roleId: Number(roleId),        
        isAdmin,
        password,
      });

      setSuccessMessage('Usuário cadastrado com sucesso! Você será redirecionado para o login.');
      setTimeout(() => router.push('/login'), 3000);
    } catch (err: any) {
      const msg = err.response?.data?.error || err.message || 'Erro ao cadastrar usuário.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="z-10 w-full flex items-center justify-between px-8 py-4 bg-white/80 shadow-sm backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Sistema de Restaurantes</h1>
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
            {/* TÍTULO */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Cadastro de Usuário
              </h1>
              <p className="text-gray-600 mt-2 font-medium">Crie sua conta para acessar o sistema</p>
            </div>

            {/* FORM */}
            <div className="space-y-6">
              {/* NOME */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white focus:bg-white text-gray-800"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Corporativo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white focus:bg-white text-gray-800"
                    placeholder="seu.email@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* COMPANY ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ID da Empresa</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white focus:bg-white text-gray-800"
                  placeholder="Ex: 1"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                />
              </div>

              {/* ROLE ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ID da Função</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white focus:bg-white text-gray-800"
                  placeholder="Ex: 1"
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
                />
              </div>

              {/* IS ADMIN */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isAdmin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="isAdmin" className="text-sm font-medium text-gray-700">
                  Administrador
                </label>
              </div>

              {/* SENHA */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white focus:bg-white text-gray-800"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* ERRO */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* SUCESSO */}
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-green-700 text-sm">
                  {successMessage}
                </div>
              )}

              {/* BOTÃO */}
              <button
                type="button"
                onClick={handleRegister}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Cadastrando...</span>
                  </div>
                ) : (
                  'Criar Conta'
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center mt-4 text-xs text-gray-600">
            <Shield className="w-4 h-4 mr-1" />
            <span>Conexão segura e criptografada</span>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
