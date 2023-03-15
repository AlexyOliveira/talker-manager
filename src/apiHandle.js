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

async function addNewTalker(talker) {
  const data = await fs.readFile(path.resolve(__dirname, './talker.json'), 'utf-8');
  const talkers = JSON.parse(data);
  const newTalker = { id: talkers.length + 1, ...talker };
  talkers.push(newTalker);
  await fs.writeFile(path.resolve(__dirname, './talker.json'), JSON.stringify(talkers, null, 2));
  return newTalker;
}

module.exports = {
    readTalkers,
    getTalkerById,
    getTokenByUser,
    addNewTalker,
  };