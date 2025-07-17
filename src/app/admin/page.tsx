'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getCurrentUser } from '@/lib/auth';
import { companies, addCompany } from '@/mock/companies';
import { users, addUser } from '@/mock/users';
import { roles } from '@/mock/roles';


export default function AdminPage() {
  const router = useRouter();
  const user = getCurrentUser();

  const [companyName, setCompanyName] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserCompanyId, setNewUserCompanyId] = useState<number | ''>('');
  const [newUserIsAdmin, setNewUserIsAdmin] = useState(false);
  const [newUserRoleId, setNewUserRoleId] = useState<number | ''>('');


  const [companyList, setCompanyList] = useState(companies);
  const [userList, setUserList] = useState(users);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push('/login');
    }
  }, [user, router]);

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return alert('Digite o nome da empresa');
    const added = addCompany(companyName.trim());
    setCompanyList([...companyList, added]);
    setCompanyName('');
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim() || !newUserCompanyId || !newUserRoleId) {
      return alert('Preencha todos os campos do usuário');
    }
    const added = addUser({
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      companyId: Number(newUserCompanyId),
      roleId: Number(newUserRoleId),
      isAdmin: newUserIsAdmin,
    });
    setUserList([...userList, added]);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserCompanyId('');
    setNewUserRoleId('');
    setNewUserIsAdmin(false);
  };


  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Painel Administrativo</h1>
          <p className="text-gray-500 mb-10">
            Gerencie empresas e usuários com permissões administrativas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Empresa */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Nova Empresa</h2>
              <form onSubmit={handleAddCompany} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome da empresa"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <ul className="list-disc list-inside text-gray-500 text-sm space-y-1">
                  {companyList.map(c => (
                    <li key={c.id}>{c.name}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Usuário */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Novo Usuário</h2>
              <form onSubmit={handleAddUser} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome do usuário"
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email do usuário"
                  value={newUserEmail}
                  onChange={e => setNewUserEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newUserCompanyId}
                  onChange={e => setNewUserCompanyId(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione a empresa</option>
                  {companyList.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <select
                  value={newUserRoleId}
                  onChange={(e) => setNewUserRoleId(Number(e.target.value))}
                  className="border rounded p-2 w-full mb-2"
                >
                  <option value="">Selecione o cargo</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>

                <label className="inline-flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={newUserIsAdmin}
                    onChange={e => setNewUserIsAdmin(e.target.checked)}
                  />
                  <span>Administrador</span>
                </label>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Cadastrar Usuário
                </button>
              </form>

              <div className="mt-6">
                <h3 className="font-medium text-gray-600 mb-2">Usuários cadastrados</h3>
                <ul className="list-disc list-inside text-gray-500 text-sm space-y-1">
                  {userList.map(u => (
                    <li key={u.id}>
                      <span className="font-medium text-gray-700">{u.name}</span> — {u.email} —{' '}
                      {companyList.find(c => c.id === u.companyId)?.name || 'Sem empresa'} —{' '}
                      {u.isAdmin ? 'Admin' : 'Funcionário'}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-gray-500">
        © 2025 Sistema Empresarial • Solução completa e profissional para gestão moderna de restaurantes
      </footer>
    </>
  );
}
