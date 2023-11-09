# CRUD
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB)](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB)
[![MySQL](https://img.shields.io/badge/mysql-%2300000f.svg?style=flat&logo=mysql&logoColor=white)](https://img.shields.io/badge/mysql-%2300000f.svg?style=flat&logo=mysql&logoColor=white)
[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)
[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=flat&logo=npm&logoColor=white)](https://img.shields.io/badge/NPM-%23CB3837.svg?style=flat&logo=npm&logoColor=white)

Exemplo didático de CRUD básico com nodejs mysql e express

## Pré-requisitos
1. **Node.js**: O Node.js deve estar instalado no seu sistema. Se não estiver, você pode baixá-lo e instalá-lo a partir do [site oficial do Node.js](https://nodejs.org/).
2. **MySQL**: Você também precisará do MySQL instalado. Se não estiver, você pode baixá-lo e instalá-lo a partir do [site oficial do MySQL](https://www.mysql.com/).

## Instalação
1. **Crie uma nova pasta** no seu sistema para o projeto.
2. **Abra um terminal** nesta pasta.
3. Execute o comando `npm init -y` para criar um novo arquivo `package.json`.
4. Instale o Express, MySQL2 e o body-parser com o comando `npm install express mysql2 body-parser`.

## Execução
1. **Copie o código** fornecido para um novo arquivo chamado `app.js` na pasta do projeto.
2. No terminal, execute o comando `node app.js` para iniciar o servidor.
3. Abra um navegador e vá para `http://localhost:3000` para ver o aplicativo em execução.

## Funcionalidades
O aplicativo é um sistema CRUD simples para gerenciar alunos. Aqui estão as principais funcionalidades:

1. **Listar Alunos (`/getalunos`)**: Esta rota exibe uma lista de todos os alunos no banco de dados. Cada aluno tem um ID, nome e idade.

2. **Adicionar Aluno (`/addaluno`)**: Esta rota exibe um formulário para adicionar um novo aluno. O formulário aceita o nome e a idade do aluno.

3. **Apagar Aluno (`/deletealuno`)**: Esta rota exibe um formulário para apagar um aluno existente. O formulário aceita o ID do aluno.

Claro, vamos analisar o código em detalhes:

1. **Importação de módulos**: O código começa importando os módulos necessários - `express`, `mysql2` e `body-parser`.

```javascript
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
```

2. **Configuração do Express**: Em seguida, uma instância do Express é criada e o body-parser é configurado para analisar corpos de solicitação JSON e dados de formulário codificados em URL.

```javascript
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
```

3. **Conexão com o banco de dados**: Uma conexão com o banco de dados MySQL é criada usando o módulo `mysql2`. A conexão é estabelecida imediatamente.

```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'escola'
});

db.connect((err) => {
  if(err){
      throw err;
  }
  console.log('MySql Connected...');
});
```

4. **Rotas do Express**: Várias rotas do Express são definidas para lidar com solicitações HTTP GET e POST. Cada rota corresponde a uma operação CRUD diferente no banco de dados.

```javascript
app.get('/', (req, res) => { ... });
app.get('/addaluno', (req, res) => { ... });
app.get('/deletealuno', (req, res) => { ... });
app.post('/deletealuno', (req, res) => { ... });
app.post('/addaluno', (req, res) => { ... });
app.get('/getalunos', (req, res) => { ... });
```

5. **Iniciando o servidor**: Finalmente, o servidor Express é iniciado na porta 3000.

```javascript
app.listen('3000', () => {
    console.log('Server started on port 3000');
});
```

