# Postech Financeiro MFE

Aplicacao web de gerenciamento financeiro desenvolvida com Next.js e organizada como um monorepo de micro frontends. O projeto possui uma aplicacao publica de marketing, um dashboard financeiro, um modulo administrativo e uma API mock baseada em JSON Server.

## Requisitos

- Node.js 22 ou superior
- npm 10 ou superior
- NVS e recomendado no Windows para alternar facilmente para o Node 22

## Arquitetura

| Aplicacao | Funcao | Porta |
| --- | --- | ---: |
| `apps/marketing` | Paginas publicas, login e cadastro | `3000` |
| `apps/finance-app` | Dashboard financeiro e APIs de transacoes | `3002` |
| `apps/admin` | Modulo administrativo | `3003` |
| `apps/api-mock` | JSON Server com usuarios e transacoes | `3001` |

Os pacotes compartilhados ficam em `packages/`:

- `core`: entidades, casos de uso, portas e regras de dominio
- `auth`: contexto de autenticacao e repositorios HTTP
- `dashboard-ui`: componentes compartilhados do dashboard
- `ui-kit`: componentes visuais reutilizaveis
- `config`: configuracoes compartilhadas do projeto

O app `marketing` funciona como ponto de entrada publico e encaminha as rotas de dashboard e API para o `finance-app` por meio de rewrites do Next.js.

## Instalacao

No Windows, selecione primeiro o Node 22:

```powershell
nvs use 22
```

Depois, na raiz do repositorio:

```powershell
npm install
```

## Desenvolvimento

Para iniciar todos os workspaces em paralelo:

```powershell
nvs use 22
npm run dev
```

Acesse a aplicacao publica em `http://localhost:3000`.

O JSON Server deve estar disponivel em `http://localhost:3001`. O comando raiz inicia o workspace `api-mock` junto com os demais apps.

Tambem e possivel iniciar cada workspace individualmente:

```powershell
npm run dev --workspace @dash/api-mock
npm run dev --workspace @dash/marketing
npm run dev --workspace @dash/finance-app
npm run dev --workspace @dash/admin
```

## Variaveis de ambiente

Os valores padrao permitem executar o projeto localmente sem configuracao adicional:

```env
JSON_SERVER_URL=http://localhost:3001
FINANCE_APP_URL=http://localhost:3002
ADMIN_APP_URL=http://localhost:3003
PUBLIC_APP_ORIGIN=http://localhost:3000
```

`JSON_SERVER_URL` e usado pelas APIs para acessar o JSON Server. `FINANCE_APP_URL` e `ADMIN_APP_URL` sao usados pelos rewrites do app de marketing.

> Atencao: o nome correto da variavel e `JSON_SERVER_URL`. Uma configuracao antiga pode conter `JSON_SERVE_URL`, que nao e lida pelo codigo.

## Usuario de demonstracao

O arquivo `apps/api-mock/db.json` possui usuarios para testes. Um exemplo:

```text
E-mail: maria@turva.com
Senha: 123456
```

As senhas estao armazenadas apenas para fins de demonstracao no mock local.

## Comandos disponiveis

Na raiz:

```powershell
npm run dev
npm run build
npm run lint
npm run typecheck
```

Por workspace, os apps Next.js possuem tambem:

```powershell
npm run preview --workspace @dash/marketing
npm run preview --workspace @dash/finance-app
npm run preview --workspace @dash/admin
```

## Docker, Compose, CI e deploy em cloud

Este repositório recebe os primeiros artefatos de uma estrategia de entrega continua:

- `Dockerfile` de desenvolvimento para empacotar a raiz do monorepo e iniciar os workspaces com Node 22;
- `Dockerfile.production` de referencia para producao;
- `docker-compose.yml` para subir os principais servicos locais (`api-mock`, `marketing`, `finance-app` e `admin`);
- `.dockerignore` para reduzir o contexto de build;
- `.github/workflows/ci.yml` com o fluxo minimo de CI para `lint`, `typecheck`, `build` e validacao de Docker.

O workflow de CI usa o gatilho:

```yaml
on:
  push:
    branches:
      - main
      - develop
  pull_request:
```

E o fluxo principal de validacao e:

```powershell
npm ci
npm run lint
npm run typecheck
npm run build
```

Para executar a pilha local com Docker:

```powershell
docker compose up --build
```

A estrategia mais segura de deploy segue o modelo:

```text
commit -> CI -> build da imagem -> push do registry -> deploy na cloud -> healthcheck
```

Para ambientes produtivos, a imagem precisa ser publicada em um registry como GHCR, Docker Hub, ECR, Artifact Registry ou Azure Container Registry. A nuvem deve receber as variaveis de ambiente, os secrets e as configuracoes de healthcheck. O container `api-mock` ainda e um servico de desenvolvimento e deve ser substituido por uma API persistente em ambiente de produção.

## Funcionalidades

- Login, cadastro, logout e recuperacao de senha
- Redirecionamento de usuarios autenticados para o dashboard
- Consulta e criacao de transacoes
- Tipos de transacao: deposito, transferencia, investimento e pagamento
- Subtipos de transferencias: PIX, DOC e TED
- Subtipos de investimentos: Fundos de investimento, Tesouro Direto, Previdencia Privada e Bolsa de Valores
- Extrato filtrado por tipo com carregamento incremental ao rolar a pagina
- Graficos de distribuicao de transferencias e investimentos
- Saldo consultado separadamente, independente do filtro do extrato

## Docker

A pasta `docker/` esta reservada para a configuracao de conteinerizacao, mas ainda nao possui Dockerfile, `docker-compose.yml` ou scripts de inicializacao versionados.

No estado atual, o fluxo oficialmente documentado e a execucao local com Node.js, npm e JSON Server. A configuracao Docker devera definir posteriormente:

- imagens dos apps Next.js e do JSON Server;
- rede entre os servicos;
- variaveis `JSON_SERVER_URL`, `FINANCE_APP_URL` e `ADMIN_APP_URL`;
- ordem de inicializacao e health checks;
- persistencia dos dados do mock.

## Estrutura resumida

```text
apps/
	admin/
	api-mock/
	finance-app/
	marketing/
packages/
	auth/
	config/
	core/
	dashboard-ui/
	ui-kit/
docker/
```

## Observacoes

- O JSON Server e um mock local e nao deve ser usado como banco de producao.
- Os cookies de sessao sao locais e possuem validade de 24 horas.
- A execucao de todos os apps exige que as portas `3000`, `3001`, `3002` e `3003` estejam livres.
