export type Order = {
  id: number;
  table: string;
  items: string[];
  status: string;
  createdAt: string;
  companyId: number;
};

export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch('https://api-sistema-restaurante.onrender.com/orders', { cache: 'no-store' });
  if (!res.ok) throw new Error('Erro ao buscar pedidos');
  return res.json();
}

export async function createOrder(data: {
  table: string;
  items: string[];
  status: 'Em preparo' | 'Pronto' | 'Entregue';
  companyId: number;
}): Promise<Order> {
  const res = await fetch('https://api-sistema-restaurante.onrender.com/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao criar pedido');
  return res.json();
}

export type OrderStatus = "Em preparo" | "Pronto" | "Entregue";

export async function updateOrderStatus(id: number, status: OrderStatus): Promise<Order> {
  const res = await fetch(`https://api-sistema-restaurante.onrender.com/orders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Erro ao atualizar status do pedido');
  return res.json();
}