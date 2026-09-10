<h1 align="center">
  <br />
  🦷 DentalSync
</h1>

<p align="center">
  Plataforma SaaS de agendamento e gestão para clínicas odontológicas
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-blue?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img alt="Stripe" src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white" />
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

---

##  Sobre o Projeto

O **DentalSync** é uma plataforma SaaS completa desenvolvida para clínicas odontológicas gerenciarem seus agendamentos, serviços e pacientes de forma simples e eficiente. Cada clínica possui seu próprio painel de controle com página pública de agendamento para os pacientes.

###  Funcionalidades

-  **Agendamento Online** — Pacientes agendam consultas pela página pública da clínica com data, horário e serviço
-  **Painel da Clínica** — Dashboard completo com visão geral de agendamentos e métricas
-  **Gestão de Serviços** — Cadastro de serviços com nome, preço e duração
-  **Perfil da Clínica** — Configuração de dados, foto, endereço e horários disponíveis
-  **Lembretes** — Sistema de lembretes internos para a equipe
-  **Relatórios** — Visão analítica dos agendamentos
-  **Assinaturas** — Planos Basic e Professional via Stripe
-  **Autenticação** — Login seguro com NextAuth v5
-  **Upload de Imagens** — Armazenamento de fotos via Cloudinary

---

##  Stack Tecnológica

| Tecnologia                                                                  | Uso                                |
| --------------------------------------------------------------------------- | ---------------------------------- |
| [Next.js 16](https://nextjs.org/)                                           | Framework React (App Router)       |
| [TypeScript 5](https://www.typescriptlang.org/)                             | Tipagem estática                   |
| [Prisma 7](https://www.prisma.io/)                                          | ORM e migrations                   |
| [PostgreSQL](https://www.postgresql.org/)                                   | Banco de dados relacional          |
| [NextAuth v5](https://authjs.dev/)                                          | Autenticação                       |
| [Stripe](https://stripe.com/)                                               | Pagamentos e assinaturas           |
| [Cloudinary](https://cloudinary.com/)                                       | Upload e armazenamento de imagens  |
| [TanStack Query](https://tanstack.com/query)                                | Gerenciamento de estado assíncrono |
| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)   | Formulários e validação            |
| [Tailwind CSS v4](https://tailwindcss.com/)                                 | Estilização                        |
| [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) | Componentes de UI                  |
| [Sonner](https://sonner.emilkowal.ski/)                                     | Notificações toast                 |

---

##  Estrutura do Projeto

```
dentalsync/
├── prisma/
│   ├── schema.prisma       # Modelos do banco de dados
│   └── migrations/         # Histórico de migrações
├── src/
│   ├── app/
│   │   ├── (public)/       # Rotas públicas (landing page + agendamento por clínica)
│   │   │   └── clinica/    # Página pública de cada clínica
│   │   ├── (panel)/        # Painel autenticado da clínica
│   │   │   └── dashboard/
│   │   │       ├── plans/      # Gestão de planos/assinatura
│   │   │       ├── profile/    # Perfil da clínica
│   │   │       ├── reports/    # Relatórios
│   │   │       └── services/   # Gestão de serviços
│   │   └── api/
│   │       ├── auth/       # Endpoints de autenticação
│   │       ├── clinic/     # API da clínica
│   │       ├── image/      # Upload de imagens
│   │       ├── schedule/   # Agendamentos
│   │       └── webhook/    # Webhooks do Stripe
│   ├── components/         # Componentes compartilhados
│   ├── lib/                # Configurações (auth, prisma, stripe)
│   ├── providers/          # Context providers
│   ├── utils/              # Funções utilitárias
│   └── generated/          # Cliente Prisma gerado
└── types/                  # Tipos TypeScript globais
```

---

## Como Executar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [PostgreSQL](https://www.postgresql.org/) (ou banco em nuvem)
- Conta no [Stripe](https://stripe.com/) (para pagamentos)
- Conta no [Cloudinary](https://cloudinary.com/) (para imagens)
- [Stripe CLI](https://stripe.com/docs/stripe-cli) (para webhooks locais)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/dentalsync.git
cd dentalsync
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de dados
DATABASE_URL="postgresql://user:password@host:5432/dentalsync"

# NextAuth
AUTH_SECRET="sua-chave-secreta"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Cloudinary
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

### 4. Execute as migrations e inicie o servidor

```bash
# Gerar cliente Prisma e rodar migrations
npx prisma migrate deploy

# Iniciar em modo de desenvolvimento
npm run dev
```

### 5. (Opcional) Escutar webhooks do Stripe

```bash
npm run stripe:listen
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## Scripts Disponíveis

| Comando                 | Descrição                                                   |
| ----------------------- | ----------------------------------------------------------- |
| `npm run dev`           | Inicia o servidor de desenvolvimento                        |
| `npm run build`         | Gera o build de produção (inclui migrate + prisma generate) |
| `npm run start`         | Inicia o servidor em modo produção                          |
| `npm run stripe:listen` | Redireciona webhooks do Stripe para o ambiente local        |

---

## Modelos do Banco de Dados

```
User (Clínica)
 ├── Subscription (plano Basic ou Professional)
 ├── Service[]    (serviços oferecidos)
 ├── Appointment[] (agendamentos recebidos)
 └── Reminder[]   (lembretes internos)

Appointment
 ├── User    (clínica vinculada)
 └── Service (serviço agendado)
```

---

## Planos

| Plano            | Recursos                                             |
| ---------------- | ---------------------------------------------------- |
| **Basic**        | Agendamentos, serviços e perfil da clínica           |
| **Professional** | Tudo do Basic + relatórios avançados e mais recursos |

---
