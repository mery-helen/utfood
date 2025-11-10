# 📋 Resumo do Projeto - Cardápio Universitário MVP

## 🎯 Objetivo
Desenvolver um MVP (Mínimo Produto Viável) de um sistema de cardápio digital para alunos e administradores de uma universidade, utilizando Angular, PocketBase e Materialize CSS.

## ✅ Funcionalidades Implementadas

### Sistema de Autenticação
- ✅ Login com email e senha
- ✅ Diferenciação de roles (aluno/admin)
- ✅ Proteção de rotas com AuthGuard
- ✅ Gerenciamento de sessão com BehaviorSubject
- ✅ Logout com limpeza de dados

### Funcionalidades do Aluno
- ✅ Visualizar cardápio do dia (prato principal + sobremesa)
- ✅ Visualizar itens da cantina
- ✅ Filtrar itens por categoria
- ✅ Tratamento de estado vazio
- ✅ Layout responsivo (desktop, tablet, mobile)

### Funcionalidades do Administrador
- ✅ Dashboard com listagem de todos os itens
- ✅ Adicionar novos itens à cantina
- ✅ Remover itens existentes
- ✅ Marcar itens como disponível/indisponível
- ✅ Editar informações dos itens
- ✅ Gerenciar categorias

### Design System
- ✅ Paleta de cores (Vermelho, Amarelo, Burgundy)
- ✅ Tipografia (Montserrat, Lora)
- ✅ Componentes reutilizáveis
- ✅ Estilos globais com variáveis CSS
- ✅ Responsividade completa

## 📦 Estrutura Técnica

### Serviços
1. **AuthService**
   - Gerencia autenticação com PocketBase
   - Mantém estado do usuário logado
   - Expõe observables para reatividade

2. **DataService**
   - Comunica com as coleções do PocketBase
   - Métodos para CRUD de itens
   - Filtros por categoria
   - Gerenciamento de avaliações

### Componentes
1. **LoginComponent** - Autenticação com abas para aluno/admin
2. **CardapioComponent** - Listagem dinâmica de itens com filtros
3. **AdminDashboardComponent** - CRUD completo com modal de formulário
4. **HeaderComponent** - Navegação e informações do usuário

### Guards
- **authGuard** - Protege rotas autenticadas
- **adminGuard** - Protege rotas exclusivas de admin

## 🗄️ Estrutura de Dados (PocketBase)

### Coleções
1. **users** - Usuários (aluno/admin)
2. **categorias** - Categorias de itens (Lanches, Bebidas, etc.)
3. **pratos** - Pratos do dia (principal + sobremesa)
4. **itens_cantina** - Itens vendidos na cantina
5. **avaliacoes** - Avaliações dos pratos

## 🎨 Design System

### Cores
- Vermelho Primário: #D1273F
- Amarelo Secundário: #FECB30
- Burgundy Acentuado: #7C2B40
- Fundo: #F8F9FA
- Cinza: #919191

### Tipografia
- Títulos: Lora (serif)
- Corpo: Montserrat (sans-serif)

## 📱 Responsividade

- **Desktop (>1024px):** Grid 3 colunas
- **Tablet (768px-1024px):** Grid 2 colunas
- **Mobile (<768px):** Grid 1 coluna

## 🔧 Tecnologias Utilizadas

- **Frontend:** Angular 17+, TypeScript
- **Backend:** PocketBase
- **Banco de Dados:** SQLite
- **CSS:** SCSS, Materialize CSS
- **Tipografia:** Google Fonts
- **Ícones:** Emojis + Material Icons

## 📋 Checklist de Implementação

- [x] Setup inicial do projeto Angular
- [x] Instalação e configuração do Materialize CSS
- [x] Configuração do Design System (cores, fontes)
- [x] Criação de componentes base (Header, Footer, Layout)
- [x] Implementação do AuthService
- [x] Implementação do DataService
- [x] Criação de Guards de autenticação
- [x] Implementação do LoginComponent
- [x] Implementação do CardapioComponent
- [x] Implementação do AdminDashboardComponent
- [x] Configuração de rotas
- [x] Estilos responsivos
- [x] Tratamento de erros
- [x] Documentação

## 🚀 Como Executar

1. Instalar dependências: `npm install`
2. Iniciar PocketBase: `./pocketbase serve`
3. Criar coleções no PocketBase (confira README.md)
4. Executar Angular: `ng serve`
5. Acessar: `http://localhost:4200`

## 📝 Notas Importantes

- O projeto utiliza Angular 17+ com standalone components
- Todas as rotas são protegidas por guards
- A aplicação é totalmente responsiva
- Design System consistente em todos os componentes
- Tratamento de estado vazio em listagens
- Validação de formulários com Reactive Forms

## 🎓 Propósito Educacional

Este é um projeto MVP desenvolvido para fins educacionais, demonstrando:
- Arquitetura de aplicações Angular modernas
- Integração com backend (PocketBase)
- Gerenciamento de estado com RxJS
- Design responsivo com SCSS
- Autenticação e autorização
- CRUD completo
- Boas práticas de desenvolvimento

## 📚 Referências

- [Angular Documentation](https://angular.dev)
- [PocketBase Documentation](https://pocketbase.io)
- [Materialize CSS](https://materializecss.com)
- [RxJS Documentation](https://rxjs.dev)

---

**Data de Criação:** Novembro 2025
**Versão:** 1.0.0 (MVP)
**Status:** ✅ Completo e Funcional
