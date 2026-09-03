import { NavigationLink } from "../entities/NavigationLink";

export class GetNavigationLinksUseCase {
  execute(): NavigationLink[] {
    // Aqui você poderia injetar um serviço de autenticação para filtrar links por permissão
    return [
      { label: 'Início', href: '/painel' },
      { label: 'Transferências', href: '/transferencias' },
      { label: 'Investimentos', href: '/investimentos' },
      { label: 'Outros Serviços', href: '/servicos' },
    ];
  }
}