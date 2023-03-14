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

  app.post('/login', (req, res) => {
   const token = getTokenByUser();
   return res.status(200).json({ token });
    });