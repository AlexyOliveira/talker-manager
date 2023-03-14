const express = require('express');
const { readTalkers, getTalkerById, getTokenByUser } = require('./apiHandle');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// midlewares

const validateEmailLogin = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const message = { message: 'O campo "email" é obrigatório' };
  if (!email) {
   return res.status(400).json(message);
  } if (!emailRegex.test(email)) {
    const message2 = { message: 'O "email" deve ter o formato "email@email.com"' };
   return res.status(400).json(message2);
  } 
    next();
};

const validatePsswordLogin = (req, res, next) => {
  const { password } = req.body;
  const message = { message: 'O campo "password" é obrigatório' };
  const message2 = { message: 'O "password" deve ter pelo menos 6 caracteres' };
  if (!password) {
    return res.status(400).json(message);
   } if (password.length < 6) {
    return res.status(400).json(message2);
   }
   next();
};

// rotas

app.get('/talker', async (req, res) => {
const talkers = await readTalkers();
return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);
  if (talker) {
    return res.status(200).json(talker);
  }
  if (!talker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  });

  app.post('/login', validateEmailLogin, validatePsswordLogin, (req, res) => {
   const token = getTokenByUser();
   return res.status(200).json({ token });
    });