# 🐾 Get A Pet

Plataforma de adoção de pets feita com a stack **MERN** (MongoDB, Express, React e Node.js).
Quem tem um pet para doar cadastra o animal com fotos; quem quer adotar navega pelos pets disponíveis e agenda uma visita com o tutor.

## Funcionalidades

- Cadastro e login de usuários com autenticação via **JWT**
- Edição de perfil com foto
- Cadastro de pets com várias imagens (`.jpg`, `.jpeg` ou `.png`)
- Listagem dos pets na página inicial
- Página de detalhes do pet com todas as fotos e dados do tutor
- Agendamento de visita: o interessado recebe o contato do tutor

> A API também já tem rotas para listar "meus pets", "minhas adoções", editar/remover pets e concluir a adoção. As telas do frontend para elas ainda não foram feitas.

## Tecnologias

| Camada   | Tecnologias |
|----------|-------------|
| Frontend | React 19, React Router 7, Axios, React Icons |
| Backend  | Node.js, Express 5, Mongoose, JWT, bcrypt, Multer |
| Banco    | MongoDB |

## Estrutura

```
GET_A_PET/
├── backend/
│   ├── controllers/     # regras de negócio (usuários e pets)
│   ├── db/              # conexão com o MongoDB
│   ├── helpers/         # token JWT, upload de imagens
│   ├── models/          # schemas do Mongoose
│   ├── public/images/   # fotos enviadas (users/ e pets/)
│   ├── routes/          # rotas da API
│   └── index.js
└── frontend/
    └── src/
        ├── components/  # layout, formulários e páginas
        ├── context/     # contexto de autenticação
        ├── hooks/       # useAuth, useFlashMessage
        └── utils/       # cliente da API (axios)
```

## Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- [MongoDB](https://www.mongodb.com/try/download/community) rodando em `localhost:27017`

### 1. Backend (porta 5000)

```bash
cd backend
npm install
npm start
```

Se a conexão funcionar, aparece `Conectou ao Mongoose!` no terminal. O banco `getapet` é criado automaticamente.

### 2. Frontend (porta 3000)

Em outro terminal:

```bash
cd frontend
npm install
npm start
```

Acesse **http://localhost:3000**.

> As portas estão fixas no código: o backend aceita requisições apenas de `http://localhost:3000` (CORS) e o frontend chama a API em `http://localhost:5000`.

## Rotas da API

### Usuários (`/users`)

| Método | Rota | Auth | Descrição |
|--------|------|:----:|-----------|
| POST | `/register` | | Cria usuário |
| POST | `/login` | | Autentica e retorna o token |
| GET | `/checkuser` | | Retorna o usuário do token |
| GET | `/:id` | | Busca usuário por ID |
| PATCH | `/edit/:id` | ✅ | Edita perfil (campo de imagem: `image`) |

### Pets (`/pets`)

| Método | Rota | Auth | Descrição |
|--------|------|:----:|-----------|
| POST | `/create` | ✅ | Cadastra pet (campo de imagens: `images`) |
| GET | `/` | | Lista todos os pets |
| GET | `/:id` | | Detalhes de um pet |
| GET | `/mypets` | ✅ | Pets cadastrados pelo usuário |
| GET | `/myadoptions` | ✅ | Pets em que o usuário agendou visita |
| PATCH | `/:id` | ✅ | Edita pet |
| DELETE | `/:id` | ✅ | Remove pet |
| PATCH | `/schedule/:id` | ✅ | Agenda visita |
| PATCH | `/conclude/:id` | ✅ | Conclui a adoção |

Rotas autenticadas exigem o header `Authorization: Bearer <token>`.

## Melhorias futuras

- Telas de "Meus Pets" e "Minhas Adoções"
- Mover o segredo do JWT e a URL do banco para variáveis de ambiente (`.env`)
- Proteger as rotas do frontend para usuários não logados
