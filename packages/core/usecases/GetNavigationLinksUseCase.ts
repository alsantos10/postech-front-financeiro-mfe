import { NavigationLink } from '@dash/core/entities/NavigationLink';

export class GetNavigationLinksUseCase {
  execute(): NavigationLink[] {
    // Aqui você poderia injetar um serviço de autenticação para filtrar links por permissão
    return [
      { label: 'Início', href: '/dashboard' },
      { label: 'Transferências', href: '/dashboard/transferences' },
      { label: 'Investimentos', href: '/dashboard/investments' },
      { label: 'Outros Serviços', href: '/products' },
    ];
  }
}