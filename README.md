# 🍽️ Cardápio Universitário - MVP

Um sistema de cardápio digital para alunos e administradores de universidades, desenvolvido em **Angular** com **PocketBase** como backend e **Materialize CSS** para o design.

## ✨ Funcionalidades

### Para Alunos
- ✅ Login com email e senha
- ✅ Visualizar cardápio do dia (prato principal + sobremesa)
- ✅ Visualizar itens da cantina por categoria
- ✅ Filtrar itens por categoria (Todos, Lanches, Bebidas, Sobremesas, etc.)
- ✅ Ver informações nutricionais dos pratos
- ✅ Avaliar refeições

### Para Administradores
- ✅ Login exclusivo para admin
- ✅ Adicionar novos itens à cantina
- ✅ Remover itens
- ✅ Marcar itens como disponível/indisponível
- ✅ Gerenciar todas as categorias
- ✅ Visualizar todos os itens (incluindo indisponíveis)

## 🚀 Guia de Configuração e Execução

### Pré-requisitos
- Node.js 18+ instalado
- PocketBase instalado e configurado
- Angular CLI instalado

### Passo 1: Instalar Dependências
```bash
npm install
```

### Passo 2: Configurar PocketBase

#### 2.1 Download e Instalação
1. Baixe o PocketBase em: https://pocketbase.io/docs/
2. Crie uma pasta para o backend (ex: `cardapio-backend`)
3. Descompacte o arquivo nessa pasta

#### 2.2 Iniciar o Servidor PocketBase
```bash
# Linux/macOS
./pocketbase serve

# Windows (PowerShell)
./pocketbase.exe serve
```

O servidor iniciará em: `http://127.0.0.1:8090`

#### 2.3 Criar Coleções no PocketBase

Acesse a Admin UI em `http://127.0.0.1:8090/_/` e crie as seguintes coleções:

**1. Coleção: users (já existe, apenas customize)**
- Adicione os campos:
  - `ra` (Text)
  - `role` (Text, valores: "aluno" ou "admin")
  - `name` (Text)

**2. Coleção: categorias**
- `nome` (Text, obrigatório)
- `icone` (Text, opcional)

**3. Coleção: pratos**
- `nome` (Text, obrigatório)
- `descricao` (Text, obrigatório)
- `tipo` (Text, valores: "principal" ou "sobremesa")
- `info_nutricional` (JSON, opcional)
- `data` (Date, obrigatório)
- `disponivel` (Boolean, padrão: true)

**4. Coleção: itens_cantina**
- `nome` (Text, obrigatório)
- `descricao` (Text, obrigatório)
- `preco` (Number, obrigatório)
- `categoria` (Relation com categorias)
- `disponivel` (Boolean, padrão: true)

**5. Coleção: avaliacoes**
- `prato` (Relation com pratos)
- `aluno` (Relation com users)
- `nota` (Number, 1-5)
- `comentario` (Text)

#### 2.4 Configurar Regras de API

Para cada coleção, configure as API Rules conforme necessário:

**pratos - List/View Rule:**
```
disponivel = true
```

**itens_cantina - List/View Rule:**
```
disponivel = true
```

**avaliacoes - Create Rule:**
```
@request.auth.id != ""
```

#### 2.5 Adicionar Dados de Teste

Crie alguns registros de teste em cada coleção para testar a aplicação.

### Passo 3: Executar a Aplicação Angular
```bash
ng serve
```

A aplicação estará disponível em: `http://localhost:4200`

### Passo 4: Testar a Aplicação

1. **Login como Aluno:**
   - Email: (use um email criado no PocketBase)
   - Senha: (use a senha configurada)
   - Você será redirecionado para o cardápio

2. **Login como Administrador:**
   - Email: (use um email com role "admin")
   - Senha: (use a senha configurada)
   - Você será redirecionado para o painel de administração

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── header/          # Cabeçalho com navegação
│   │   ├── footer/          # Rodapé
│   │   └── layout/          # Layout principal
│   ├── pages/
│   │   ├── login/           # Página de login
│   │   ├── cardapio/        # Página do cardápio (aluno)
│   │   └── admin-dashboard/ # Painel de administração
│   ├── services/
│   │   ├── auth.ts          # Serviço de autenticação
│   │   └── data.ts          # Serviço de dados
│   ├── guards/
│   │   └── auth-guard.ts    # Guard de autenticação
│   ├── app.ts               # Componente raiz
│   ├── app.routes.ts        # Configuração de rotas
│   └── app.config.ts        # Configuração da aplicação
├── styles.scss              # Estilos globais
└── main.ts                  # Ponto de entrada
```

## 🎨 Design System

### Cores Principais
- **Vermelho Primário:** #D1273F
- **Amarelo Secundário:** #FECB30
- **Burgundy Acentuado:** #7C2B40
- **Fundo:** #F8F9FA
- **Cinza:** #919191

### Tipografia
- **Títulos:** Lora (serif)
- **Corpo:** Montserrat (sans-serif)

## 🔐 Autenticação

A aplicação utiliza o sistema de autenticação do PocketBase com:
- Email e senha para login
- Tokens JWT armazenados localmente
- Guards de rota para proteção
- Roles de usuário (aluno/admin)

## 📱 Responsividade

A aplicação é totalmente responsiva:
- **Desktop:** Layout completo com grid de 3 colunas
- **Tablet:** Layout com grid de 2 colunas
- **Mobile:** Layout com 1 coluna

## 🐛 Troubleshooting

### Erro de conexão com PocketBase
- Verifique se o servidor PocketBase está rodando
- Confirme a URL em `src/app/services/auth.ts`

### Erro de autenticação
- Verifique se o usuário existe no PocketBase
- Confirme se a senha está correta
- Verifique se o campo `role` está configurado

### Dados não aparecem
- Verifique se as coleções foram criadas
- Confirme se há dados nas coleções
- Verifique as API Rules

## 📝 Notas Importantes

- O projeto utiliza Angular 17+ com standalone components
- PocketBase fornece o backend e banco de dados
- Materialize CSS é utilizado para componentes base
- A aplicação é totalmente responsiva e acessível

## 🎓 Para Fins Educacionais

Este é um projeto MVP (Mínimo Produto Viável) desenvolvido para fins educacionais. Para produção, considere:
- Adicionar testes unitários e de integração
- Implementar tratamento de erros mais robusto
- Adicionar validações mais complexas
- Implementar cache de dados
- Adicionar logs e monitoramento

## 📚 Tecnologias Utilizadas

- **Frontend:** Angular 17+, TypeScript
- **Backend:** PocketBase
- **Banco de Dados:** SQLite (PocketBase)
- **CSS:** SCSS, Materialize CSS
- **Tipografia:** Montserrat, Lora
- **Ícones:** Material Icons
