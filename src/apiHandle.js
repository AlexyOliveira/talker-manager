const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

async function readTalkers() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, './talker.json'), 'utf-8');
    if (data) {
          const talkers = JSON.parse(data);
   return talkers;
    }
    if (!data) {
     return [];
    }
  } catch (error) {
    console.error(`Erro na leitura ${error}`);
  }
}

async function getTalkerById(id) {
  try {
    const data = await fs.readFile(path.resolve(__dirname, './talker.json'), 'utf-8');
    const talkers = JSON.parse(data);
    const talker = talkers.find((t) => t.id === Number(id));
    return talker;
  } catch (error) {
    console.log(error);
  }
}

 function getTokenByUser() {
  const token = uuidv4();
  const tokenReduce = token.slice(0, 18).replace(/-/g, '');
  return tokenReduce;
}

module.exports = {
    readTalkers,
    getTalkerById,
    getTokenByUser,
  };