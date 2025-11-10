# Cardápio Universitário - TODO

## Fase 1: Configuração e Setup
- [x] Configurar Design System (Materialize, Fontes, Cores)
- [x] Criar estrutura de componentes base (Header, Footer, Layout)
- [x] Configurar roteamento principal

## Fase 2: Autenticação
- [x] Criar AuthService com PocketBase
- [x] Implementar LoginComponent (Aluno + Admin)
- [x] Criar AuthGuard para rotas protegidas
- [x] Implementar logout e gerenciamento de sessão

## Fase 3: Backend (PocketBase)
- [ ] Criar coleção 'users' com campos customizados
- [ ] Criar coleção 'categorias'
- [ ] Criar coleção 'pratos'
- [ ] Criar coleção 'itens_cantina'
- [ ] Criar coleção 'avaliacoes'
- [ ] Configurar regras de API (API Rules)
- [ ] Popular com dados de amostra

## Fase 4: Funcionalidades do Aluno
- [x] Criar DataService para comunicação com PocketBase
- [x] Implementar CardapioComponent (tela inicial)
- [x] Implementar listagem dinâmica de itens
- [x] Implementar filtros por categoria
- [ ] Implementar visualização de detalhes (nutrição)
- [ ] Implementar sistema de avaliações
- [x] Tratamento de estado vazio

## Fase 5: Funcionalidades do Admin
- [x] Implementar AdminDashboardComponent
- [x] Criar funcionalidade de adicionar itens
- [x] Criar funcionalidade de remover itens
- [x] Criar funcionalidade de marcar disponibilidade
- [x] Implementar CRUD completo

## Fase 6: Responsividade e Polish
- [x] Testar responsividade em desktop
- [x] Testar responsividade em mobile
- [x] Aplicar Design System em todos os componentes
- [ ] Validar acessibilidade
- [ ] Testes de integração

## Fase 7: Entrega
- [ ] Documentação final
- [ ] Vídeo de demonstração
- [ ] Checkpoint final
