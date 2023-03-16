const express = require('express');
const {
  validateEmailLogin,
  validatePsswordLogin,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  tokenVerify,
  validateTalkerById,
  validateRateSearchingByRate,
} = require('./middleWares');
const {
  readTalkers,
  getTalkerById,
  getTokenByUser,
  addNewTalker,
  changeTalkerInfoById,
  deleteTalker,
  searchTalker,
} = require('./apiHandle');

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

app.get('/talker', async (req, res) => {
  const talkers = await readTalkers();
  return res.status(200).json(talkers);
});

app.get('/talker/search', tokenVerify, validateRateSearchingByRate, async (req, res) => {
  const { q, rate, date } = req.query;
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (date && regex.test(date) === false) {
    return res.status(400).json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }
 const talkers = await searchTalker(q, rate, date);
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

app.post(
  '/talker',
  tokenVerify,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  async (req, res) => {
    const newTalker = req.body;
    const talker = await addNewTalker(newTalker);
    return res.status(201).json(talker);
  },
);

app.put(
  '/talker/:id',
  tokenVerify,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateTalkerById,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
   const talkerEdited = await changeTalkerInfoById(id, name, age, talk);
    return res.status(200).json(talkerEdited);
  },
);

app.delete('/talker/:id', tokenVerify, (req, res) => {
  const { id } = req.params;
  deleteTalker(id);
  return res.status(204).json();
});
