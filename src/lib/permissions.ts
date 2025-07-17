export function getPermissionsByRoleId(roleId: number): string[] {
  switch (roleId) {
    case 1: // Gerente
      return ['orders', 'kitchen', 'menu', 'users', 'reports', 'settings'];
    case 2: // Comprador
      return ['orders', 'kitchen', 'menu', 'users', 'reports'];
    case 3: // Secretário
      return ['orders', 'kitchen', 'menu', 'reports'];
    case 4: // Atendente
      return ['orders', 'menu'];
    case 5: // Garçom
      return ['menu'];
    case 6: // Cozinheiro
      return ['kitchen'];
    default:
      return [];
  }
}
