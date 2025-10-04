# 📌 UTFood - Cardápio Digital do RU da UTFPR 

## 👩‍💻 Autores
- Mery Helen de Souza
- Lucas Hajime Oshiro Takatuzi

## 📖 Descrição do projeto
Este projeto tem como objetivo digitalizar e facilitar a experiência dos estudantes da UTFPR no Restaurante Universitário (RU). A aplicação permite que o aluno realize a autenticação com as informações institucionais (RA e senha), visualize com detalhes o cardápio do dia, assim como a listagem dos produtos disponíveis em cantina (drinks disponíveis, categorias, buscas por nomes), além de realizar o resumo do pedido, para assim facilitar e agilizar a compra.

## 🎨 Prototipação no Figma
https://www.figma.com/design/Gf19WPZ3Iy8ONeoR8i5HUD/UTFood?node-id=0-1&m=dev&t=5yq3L1s8GIk1KSN4-1

## 🖌️ Design System
Cores principais:
#FFFFE3
#FECB30
#D1273F
#7C2B40
#919191

 Fontes: 
Montserrat
Lora

## 🎭 Framework CSS
Materialize CSS/Material Design: Para o desenvolvimento do design do aplicativo, foi escolhido o framework Materialize CSS, baseado no Material Design. A decisão se justifica pela praticidade na construção de componentes visuais padronizados, pelo suporte nativo à responsividade e pela consistência estética que o framework oferece. Dessa forma, o UTFood consegue unir identidade institucional, usabilidade e uma interface agradável para os alunos.


## ⚙️ Backend utilizado


## 📦 Dependências


## 🚀 Link para o site em produção


## ✅ Checklist de funcionalidades
### RA1 - Prototipar e projetar interfaces gráficas de usuário, considerando princípios de usabilidade e experiência do usuário.
- [ ] ID1: Desenvolver protótipos de interfaces que demonstram compreensão das diretrizes de usabilidade.
- [ ] ID2: Projetar interfaces responsivas que se adaptam a diferentes tamanhos de tela.

### RA2 - Criar e reutilizar componentes em frameworks frontend, desenvolvendo interfaces modulares, responsivas e estilizadas.
- [ ] ID3: Desenvolver componentes reutilizáveis e que se adaptem de maneira responsiva em vários tamanhos de tela.
- [ ] ID4: Incorporar componentes de frameworks CSS.
- [ ] ID5: Aplicar diretivas estruturais para exibir ou ocultar elementos de forma condicional.
- [ ] ID6: Utilizar diretivas estruturais para repetir elementos de interface de maneira dinâmica, a fim de criar listas, galerias ou outras visualizações baseadas em conjuntos de dados.
- [ ] ID7: Aplicar Pipes para formatar a apresentação de dados.

### RA3 - Sincronizar dados entre a interface gráfica e o modelo de dados, aplicando técnicas de binding para manter a consistência.
- [ ] ID8: Aplicar técnicas de one-way data binding, como Interpolation e Property Binding, para exibir e atualizar dados na interface gráfica de maneira unidirecional.
- [ ] ID9: Aplicar técnicas de event binding para capturar eventos do usuário na interface e interagir com o modelo de dados.
- [ ] ID10: Aplicar técnicas de two-way data binding para criar uma sincronização bidirecional automática entre a interface e o modelo de dados.
- [ ] ID11: Usar variáveis de template para manipulação dinâmica dos dados na interface gráfica.

### RA4 - Implementar comunicação eficaz entre componentes, utilizando padrões de comunicação e serviços para compartilhar lógica e dados.
- [ ] ID12: Criar comunicação entre componentes não relacionados hierarquicamente por meio de serviços através do mecanismo de injeção de dependência.
- [ ] ID13: Utilizar as diretivas @Input ou @Output para comunicanção em uma hierarquia de componentes.

### RA5 - Criar interfaces de navegação intuitivas e responsivas, implementando roteamento em aplicações de página única (SPA).
- [ ] ID14: Configurar rotas para diferentes partes da aplicação, permitindo a navegação entre páginas distintas.
- [ ] ID15: Passar dados entre componentes que representam diferentes telas usando parâmetros de rotas.
- [ ] ID16: Criar uma estrutura de navegação aninhada para representar hierarquias de conteúdo.
- [ ] ID17: Aplicar guardas de rotas para controlar o acesso a rotas específicas da aplicação, assegurando que somente usuários autorizados possam acessar determinadas partes da interface.

### RA6 - Realizar requisições assíncronas para serviços web, compreendendo os protocolos e formatos de troca de dados, tratando respostas e erros.
- [ ] ID18: Fazer requisições assíncronas a uma API pública para no mínimo a operação GET.
- [ ] ID19: Fazer requisições assíncronas a uma API particular (ferramenta BaaS) para as operações GET, POST, PUT, PATCH e DELETE.
- [ ] ID20: Tratar respostas de sucesso e erros das requisições assíncronas.
- [ ] ID21: Aplicar validações de entrada nos campos do formulário, utilizando técnicas como expressões regulares (REGEX), e apresentar mensagens de erro claras e informativas para auxiliar os usuários a corrigir entradas incorretas.
- [ ] ID22: Desabilitar adequadamente o botão de submit enquanto o formulário conter campos inválidos, evitando a submissão de dados incorretos.
- [ ] ID23: Utilizar Promises para tratar respostas assíncronas.
- [ ] ID24: Utilizar Observables para tratar respostas assíncronas.

### RA7 - Gerenciar o código-fonte de maneira eficiente, implementar boas práticas de controle de versão e colaborar em projetos de desenvolvimento.
- [ ] ID25: Criar um repositório no GitHub utilizando a estrutura do Gitflow, estabelecendo as branches "main" e "develop".
- [ ] ID26: Colaborar com outros membros do projeto, realizando fusões (merges) e resolução de conflitos.
- [ ] ID27: Planejar, configurar e executar o processo de build da aplicação, preparando-a para produção e realizar o deploy em um ambiente de hospedagem.


## 🛠️ Instruções de execução
- Clonar o repositório com `git clone`
- Fazer checkout no branch `develop` que contém as modificações mais recentes
- Abrir o projeto no editor Visual Studio Code (VS Code)
- Abrir um terminal pelo VSCode ou qualquer terminal do seu Sistema Operacional apontando para o diretório raiz do projeto 
- Instalar as dependências contidas no `package.json`
  - Comando: `npm i`
- (Opcional) Instalar o JSON Server globalmente disponível em `https://www.npmjs.com/package/json-server`
  - Comando: `npm i -g json-server` 
  - É opcional porque a dependência já vem cadastrada no arquivo `package.json` para instalação local na pasta `node_modules`
- Executar a API Fake (JSON Server) via um dos seguintes comandos: 
  - Execução via script registrado no `package.json`: `npm run json:server:routes` 
  - Ou via Execução explícita: `json-server --watch db.json --routes routes.json`
- O comando para execução do JSON Server deve ser aplicado no diretório raiz do projeto, ou seja, que contém o arquivo `db.json` e `routes.json`.
  - Por padrão, a aplicação JSON Server executa no endereço `localhost:3000`    
- Abrir um novo terminal pelo VSCode e então executar o projeto Angular
  - Comando: `ng s -o`

