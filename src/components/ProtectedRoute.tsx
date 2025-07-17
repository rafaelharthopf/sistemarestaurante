'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth'; 

type ProtectedRouteProps = {
  children: React.ReactNode;
  adminOnly?: boolean; 
  allowedRoles?: number[];
};

export default function ProtectedRoute({
  children,
  adminOnly = false,
  allowedRoles = [],
}: ProtectedRouteProps) {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) {
      router.replace('/login');
      return;
    }

    if (adminOnly && !user.isAdmin) {
      router.replace('/unauthorized');
      return;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.roleId)) {
      router.replace('/unauthorized');
      return;
    }

    setIsAllowed(true);
  }, [adminOnly, allowedRoles, router]);

  if (!isAllowed) {
    return null;
  }

  return <>{children}</>;
}
