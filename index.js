// Importação dos módulos necessários
const express = require('express');
const bodyParser = require('body-parser');

// Inicialização do Express
const app = express();
const port = 8082;

// Configuração para usar o middleware body-parser para interpretar dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));
// Configuração da view engine EJS
app.set('view engine', 'ejs');
// Configuração para servir arquivos estáticos na pasta 'public'
app.use(express.static('public'));

// Array para armazenar usuários (pode ser substituído por um banco de dados em um ambiente de produção)
const users = [
  { email: 'user1@example.com', password: 'password1', name: 'User 1' },
  { email: 'user2@example.com', password: 'password2', name: 'User 2' },
];

// Rota para exibir a página de registro de usuários
app.get('/register', (req, res) => {
  res.render('register', { error: null });
});

// Rota para processar o formulário de registro de usuários
app.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validar campos
  if (!name || !email || !password || !confirmPassword || password !== confirmPassword) {
    return res.render('register', { error: 'Por favor, preencha todos os campos corretamente.' });
  }

  // Verificar se o e-mail já está cadastrado
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.render('register', { error: 'Este e-mail já está cadastrado. Tente outro.' });
  }

  // Adicionar novo usuário ao array
  const newUser = { name, email, password };
  users.push(newUser);

  // Redirecionar para a página de login
  res.redirect('/');
});

// Rota para listar usuários cadastrados
app.get('/users', (req, res) => {
  res.render('users', { users });
});

// Rota para deletar um usuário
app.post('/deleteUser', (req, res) => {
  const { email } = req.body;
  
  // Encontrar e excluir o usuário pelo e-mail
  const index = users.findIndex(u => u.email === email);
  if (index !== -1) {
    users.splice(index, 1);
  }

  // Redirecionar de volta para a página de usuários
  res.redirect('/users');
});

// Rota para a página de produtos
app.get('/products', (req, res) => {
  res.render('products', { products });
});

// Rota para a página de serviços
app.get('/services', (req, res) => {
  res.render('services', { services });
});

// Rota para a página de clientes
app.get('/clients', (req, res) => {
  res.render('clients', { clients });
});

// Rota para a página de contatos
app.get('/contacts', (req, res) => {
  res.render('contacts', { contacts });
});

// Rota para a página inicial
app.get('/', (req, res) => {
  res.render('index', { error: null });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Redirecionar para a página de boas-vindas
    res.render('welcome', { user });
  } else {
    // Exibir mensagem de erro na página de login
    res.render('index', { error: 'Credenciais inválidas. Tente novamente.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
