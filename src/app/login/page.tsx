'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';
import { Eye, EyeOff, Mail, Lock, ChefHat, Shield } from 'lucide-react';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  function goToDashboard() {
    console.log('clicou')
    router.push('/');
  }


  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const user = login(email);
      if (user) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push(user.isAdmin ? '/admin' : '/dashboard');
      } else {
        setError('Credenciais inválidas. Verifique seu email e tente novamente.');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>    
    <header className="z-10 w-full flex items-center justify-between px-8 py-4 bg-white/80 shadow-sm backdrop-blur-sm">
      <div onClick={goToDashboard} className="flex items-center space-x-3 cursor-pointer">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
          <ChefHat className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-800">Sistema de Restaurantes</h1>
      </div>
    </header>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-20 pointer-events-none"></div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          
          <div className="relative">
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
                Sistema Empresarial
              </h1>
              <p className="text-gray-600 mt-2 font-medium">
                Gestão de Restaurantes
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-3 rounded-full"></div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Corporativo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white text-gray-800"
                    placeholder="seu.email@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white text-gray-800"
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

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Entrando...</span>
                  </div>
                ) : (
                  'Acessar Sistema'
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  Esqueceu sua senha?
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center text-xs text-gray-500">
                <p>© 2025 Sistema Empresarial</p>
                <p className="mt-1">Solução completa para gestão de restaurantes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-4 text-xs text-gray-600">
          <Shield className="w-4 h-4 mr-1" />
          <span>Conexão segura e criptografada</span>
        </div>
      </div>
    </div>
    <footer className="text-center py-6 text-sm text-gray-500">
        © 2025 Sistema Empresarial • Solução completa e profissional para gestão moderna de restaurantes
      </footer> 
    </>
  );
}