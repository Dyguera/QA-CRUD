# TODO App - Gerenciador de Tarefas

Aplicação FullStack moderna para gerenciamento de tarefas, utilizando **React** no frontend, **Node.js** no backend e **PostgreSQL** como banco de dados. Todo o ambiente é orquestrado via **Docker**, garantindo fácil execução e portabilidade.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Arquitetura e Tecnologias](#arquitetura-e-tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Executar (Docker)](#como-executar-docker)
- [Principais Componentes e Motivações](#principais-componentes-e-motivações)
- [Exemplos de Uso da API](#exemplos-de-uso-da-api)
- [Testes Automatizados](#testes-automatizados)
- [Boas Práticas e Clean Code](#boas-práticas-e-clean-code)
- [FAQ](#faq)

---

## Visão Geral

Este projeto foi criado para demonstrar uma aplicação de tarefas robusta, escalável e fácil de manter, utilizando as melhores práticas de desenvolvimento web e Clean Code. O uso do Docker elimina a necessidade de instalar dependências localmente, facilitando o setup em qualquer ambiente.

---

## Arquitetura e Tecnologias

- **Frontend:** React (não incluso neste repositório)
- **Backend:** Node.js (Express)
- **Banco de Dados:** PostgreSQL
- **Orquestração:** Docker e Docker Compose
- **Testes:** Jest e Supertest

---

## Estrutura do Projeto

```
QA-CRUD/
│
├── server/
│   ├── src/
│   │   ├── controllers/      # Lógica das rotas (controllers)
│   │   ├── db/               # Conexão e queries do banco
│   │   ├── routes/           # Definição das rotas
│   │   └── app.js            # Instância do Express
│   ├── server.js             # Inicialização do servidor
│   └── Dockerfile            # Dockerfile do backend
│
├── docker-compose.yml        # Orquestração dos containers
├── tests/                    # Testes automatizados
└── README.md                 # Este arquivo
```

---

## Como Executar (Docker)

### 1. Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 2. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/todo-app.git
cd todo-app
```

### 3. Inicie os Containers

```bash
docker-compose up --build
```

- Isso irá:
  - Construir a imagem do backend Node.js
  - Subir um container PostgreSQL já configurado
  - Criar as tabelas automaticamente se não existirem

### 4. Acesse a Aplicação

- **Frontend:** http://localhost:3000 (se implementado)
- **API (Backend):** http://localhost:5000
- **Exemplo de endpoint:** http://localhost:5000/todos

---

## Principais Componentes e Motivações

### Docker & Docker Compose

- **Por quê?**  
  Facilita o setup, elimina problemas de ambiente e garante que todos rodem a mesma stack.
- **Como?**  
  O `docker-compose.yml` define os serviços (app e banco), redes e volumes.

### Estrutura Modular (Clean Code)

- **Por quê?**  
  Facilita manutenção, testes e escalabilidade.
- **Como?**  
  Separando controllers, rotas e queries, cada arquivo tem uma responsabilidade clara.

### Variáveis de Ambiente

- **Por quê?**  
  Permite configurar banco, porta, etc, sem alterar código.
- **Como?**  
  Usando `process.env` no Node.js e variáveis no `docker-compose.yml`.

### Testes Automatizados

- **Por quê?**  
  Garante que a API funcione como esperado e facilita refatorações.
- **Como?**  
  Utilizando Jest e Supertest para testar endpoints da API.

---

## Exemplos de Uso da API

### Listar todas as tarefas

```http
GET /todos
```
**Resposta:**
```json
[
  { "id": 1, "task": "Comprar pão", "completed": false },
  { "id": 2, "task": "Estudar Node.js", "completed": true }
]
```

---

### Criar uma nova tarefa

```http
POST /todos
Content-Type: application/json

{
  "task": "Ler um livro"
}
```
**Resposta:**
```json
{
  "id": 3,
  "task": "Ler um livro",
  "completed": false
}
```

---

### Atualizar uma tarefa

```http
PUT /todos/3
Content-Type: application/json

{
  "task": "Ler dois livros",
  "completed": true
}
```
**Resposta:**
```json
{
  "id": 3,
  "task": "Ler dois livros",
  "completed": true
}
```

---

### Remover uma tarefa

```http
DELETE /todos/3
```
**Resposta:**  
Status 204 (No Content)

---

## Testes Automatizados

Os testes estão localizados em `/tests` e cobrem todos os endpoints principais.

Para rodar os testes:

```bash
docker-compose exec app npm test
```

---

## Boas Práticas e Clean Code

- **Responsabilidade única:** Cada módulo faz apenas uma coisa.
- **Validação de dados:** Entradas do usuário são validadas antes de acessar o banco.
- **Tratamento de erros:** Mensagens claras e status HTTP apropriados.
- **Código comentado:** Funções e trechos importantes possuem comentários explicativos.
- **Sem dependências locais:** Tudo roda via Docker.

---

## FAQ

**Preciso instalar Node ou Postgres na minha máquina?**  
Não! Basta ter Docker e Docker Compose.

**Como persisto os dados do banco?**  
O volume `db_data` garante que os dados do Postgres não se percam ao reiniciar os containers.

**Posso rodar só o backend?**  
Sim, basta rodar apenas o serviço `app` no Docker Compose.

**Como altero a porta?**  
Edite a variável `PORT` no `docker-compose.yml`.

---

Ficou com dúvidas?  
Abra uma issue ou entre em contato!

---