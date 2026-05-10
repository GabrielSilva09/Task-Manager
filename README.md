
# Task Manager - Teste técnico Manole
Este projeto é um Gestor de Tarefas completo, desenvolvido para demonstrar habilidades em arquitetura de software, integração entre sistemas e boas práticas de desenvolvimento. A solução engloba um Backend REST robusto, um Frontend SPA moderno e responsivo e uma infraestrutura totalmente Dockerizada.

# Tecnologias utilizadas
## Frontend
- React.js com Vite

- TypeScript

## Backend
- Node.js com Express

- TypeScript

- PostgreSQL

# Infraestrutura e Testes automatizados
- Docker

- Jest


# Como Rodar o Projeto
A forma mais simples e recomendada de executar a aplicação é através do Docker, que garante que todo o ambiente (Node, React e PostgreSQL) suba configurado corretamente.

## Pré-requisitos

Docker instalado

## Passo a Passo

```bash
# 1. Clonar o projeto (inclui backend e frontend)
git clone git@github.com:GabrielSilva09/Task-Manager-Manole.git Task-Manager
cd Task-Manager

# 2. Rodar o docker e aguardar a inicialização dos serviços
docker-compose up --build

# 3. Acessar
#    Frontend:       http://localhost:5173
#    API:            http://localhost:3000
#    PostgreSQL:     http://localhost:5432
```

# Teste de Lógica (Parte 1)
### Para validar o script correspondente à primeira parte do teste de lógica, siga estas instruções:

Abra o terminal (CMD ou PowerShell) na pasta: backend/src/logic

Execute o comando:

```Bash
node processarArray.js
```
_(Certifique-se de que o Node.js está instalado na sua máquina para rodar este script isoladamente ou execute diretamente no container do docker com o comando: docker-compose exec backend node src/logic/processarArray.js)_

### Para validar as respostas dos conceitos técnicos basta abrir o arquivo:

Parte-2-Conceitos-Respostas.md (localizado na raiz do projeto).

# Arquitetura do Projeto
O projeto foi dividido em três camadas principais para garantir a separação de responsabilidades:

- Backend (Node.js + Express + TypeScript): Segue o padrão de camadas (Controllers, Models e Routes). A persistência é feita num banco PostgreSQL, utilizando o pg (node-postgres) para consultas.

- Frontend (React + Vite + TypeScript): Organizado em Componentes, Hooks Customizados e Services. A lógica de estado é encapsulada em hooks para manter os componentes de interface limpos.

- Database (PostgreSQL): Base de dados relacional para garantir a integridade dos dados e suporte a consultas complexas (como filtros e paginação).

# Decisões Técnicas Tomadas

- Paginação Real no Banco de Dados: Diferente de soluções que paginam na memória do navegador, esta aplicação utiliza LIMIT e OFFSET diretamente nas queries SQL. Isso garante que a aplicação continue rápida mesmo com milhares de tarefas.

- Escolha do Bundler (Vite vs. Next.js): Considerei o uso de Next.js para esta solução, mas optei pelo Vite para manter a aplicação leve e focar na separação clara entre as camadas de API e Client. Esta abordagem facilita a escalabilidade independente de cada serviço e mantém o projeto simples para um sistema de gestão de tarefas.

- TypeScript em toda a Stack: A escolha pelo TS visa a segurança do código, facilitando refatorações e evitando erros comuns de tipagem.

- Custom Hooks para Lógica de API: Toda a comunicação com o backend foi isolada no hook useTasks.ts. Isso facilita a manutenção e permite que a interface reaja automaticamente a mudanças de estado.

- CSS Grid & Flexbox: Optei por CSS puro com metodologias modernas para garantir uma interface responsiva sem a necessidade de bibliotecas pesadas de terceiros.

# Estratégia de Deploy
Para uma versão de produção, a ideia é:

- Frontend: Deploy na Vercel ou Netlify (otimizados para SPAs).

- Backend & DB: Deploy na Render ou Railway utilizando containers Docker.

- Variáveis de Ambiente: Configuração de VITE_API_URL no front e DATABASE_URL no back para isolar os ambientes de desenvolvimento e produção.

# Pontos Fortes e Limitações
## Pontos Fortes
- Dockerização: Ambiente simples de reproduzir em qualquer máquina.

- UX/UI: Interface limpa, com feedback visual de status e estados de carregamento.

- Escalabilidade: Estrutura pronta para crescer, com paginação e filtros eficientes no banco.

## Limitações Atuais
- Autenticação: A versão atual é aberta, sem sistema de login.

- Persistência de Filtros: Os filtros de pesquisa são perdidos ao atualizar a página.

# O que eu melhoraria com mais tempo? (Próximos Passos)
- Autenticação JWT: Implementação de um sistema de login stateless com JWT e encriptação de passwords com bcrypt.

- Testes Automatizados: Adição de testes de integração E2E no frontend.

- Notificações em Tempo Real: Implementação de WebSockets para atualizar a lista de tarefas em tempo real caso existam vários utilizadores.

# 👤 Autor
Desenvolvido por Gabriel Silverio – <a href="https://www.linkedin.com/in/gabriel-silv%C3%A9rio-b697201b8">LinkedIn</a>
