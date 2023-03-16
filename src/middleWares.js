const {
    getTalkerById,
  } = require('./apiHandle');

const validateEmailLogin = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const message = { message: 'O campo "email" é obrigatório' };
  if (!email) {
    return res.status(400).json(message);
  }
  if (!emailRegex.test(email)) {
    const message2 = {
      message: 'O "email" deve ter o formato "email@email.com"',
    };
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
  }
  if (password.length < 6) {
    return res.status(400).json(message2);
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  const nameEmptMessage = { message: 'O campo "name" é obrigatório' };
  const nameLength3 = { message: 'O "name" deve ter pelo menos 3 caracteres' };
  if (!name) {
    return res.status(400).json(nameEmptMessage);
  }
  if (name.length < 3) {
    return res.status(400).json(nameLength3);
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  const ageArea = { message: 'O campo "age" é obrigatório' };
  const isNumber = {
    message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
  };
  if (!age) {
    return res.status(400).json(ageArea);
  }
  if (Number.isInteger(age) === false || age < 18) {
    return res.status(400).json(isNumber);
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const talkArea = { message: 'O campo "talk" é obrigatório' };
  const isWatchedAt = { message: 'O campo "watchedAt" é obrigatório' };
  const isDataFormat = {
    message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  };
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!talk) {
    return res.status(400).json(talkArea);
  }
  if (!talk.watchedAt) {
    return res.status(400).json(isWatchedAt);
  }
  if (regex.test(talk.watchedAt) === false) {
    return res.status(400).json(isDataFormat);
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  const rateArea = { message: 'O campo "rate" é obrigatório' };
  const rateBetween1and5 = {
    message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
  };
  if (talk.rate === undefined) {
    return res.status(400).json(rateArea);
  }
  if (talk.rate < 1 || talk.rate > 5 || !Number.isInteger(talk.rate)) {
    return res.status(400).json(rateBetween1and5);
  }

  next();
};

const validateRateSearchingByRate = (req, res, next) => {
  const { rate } = req.query;
  const rateToNUmber = Number(rate);
  const rateBetween1and5 = {
    message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
  };
  if (!rate) {
    return next();
  }
  if (rate < 1 || rate > 5 || !Number.isInteger(rateToNUmber)) {
    return res.status(400).json(rateBetween1and5);
  }
  next();
};

const tokenVerify = (req, res, next) => {
  const { authorization } = req.headers;
  const noToken = { message: 'Token não encontrado' };
  const invalidToken = { message: 'Token inválido' };
  if (!authorization) {
    return res.status(401).json(noToken);
  }
  if (
    authorization.length < 16
    || authorization.length > 16
    || typeof authorization !== 'string'
  ) {
    return res.status(401).json(invalidToken);
  }

  next();
};

const validateTalkerById = async (req, res, next) => {
    const message = { message: 'Pessoa palestrante não encontrada' };
    const { id } = req.params;
  const talker = await getTalkerById(id);
  if (!talker) {
    return res.status(404).send(message);
  }
  next();
};

module.exports = {
  validateEmailLogin,
  validatePsswordLogin,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  tokenVerify,
  validateTalkerById,
  validateRateSearchingByRate,
};
