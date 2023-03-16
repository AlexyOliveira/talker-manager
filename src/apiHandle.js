const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const TALKER_DIR = './talker.json';

async function readTalkers() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, TALKER_DIR), 'utf-8');
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
    const data = await fs.readFile(path.resolve(__dirname, TALKER_DIR), 'utf-8');
    const talkers = JSON.parse(data);
    const talker = talkers.find((t) => t.id === Number(id));
    console.log(talker);
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
  const data = await fs.readFile(path.resolve(__dirname, TALKER_DIR), 'utf-8');
  const talkers = JSON.parse(data);
  const newTalker = { id: talkers.length + 1, ...talker };
  talkers.push(newTalker);
  await fs.writeFile(path.resolve(__dirname, TALKER_DIR), JSON.stringify(talkers, null, 2));
  return newTalker;
}

async function changeTalkerInfoById(id, name, age, talk) {
  try {
    const data = await fs.readFile(path.resolve(__dirname, TALKER_DIR), 'utf-8');
    const talkers = JSON.parse(data);
    const talker = talkers.find((t) => t.id === Number(id));
    talker.name = name;
    talker.age = age;
    talker.talk = talk;
    const f = talkers.filter((t) => t.id !== Number(id));
    f.push(talker);
    await fs.writeFile(path.resolve(__dirname, TALKER_DIR), JSON.stringify(f, null, 2));
    return talker;
  } catch (error) {
    console.log(error);
  }
}

async function deleteTalker(id) {
  try {
    const data = await fs.readFile(path.resolve(__dirname, TALKER_DIR), 'utf-8');
    const talkers = JSON.parse(data);
    const talker = talkers.filter((t) => t.id !== Number(id));
    await fs.writeFile(path.resolve(__dirname, TALKER_DIR), JSON.stringify(talker, null, 2));
  } catch (error) {
    console.log(error);
  }
}

async function searchTalker(q, rate) {
   const data = await fs.readFile(path.resolve(__dirname, TALKER_DIR), 'utf-8');
    let talkers = JSON.parse(data);
  try {
    if (q) {
    //    const talker = talkers.filter((t) => (
    //   t.name.toLowerCase().includes(q.toUpperCase()) || t.name.includes(q.toLowerCase())));
    // return talker;
   talkers = talkers
      .filter((t) => t.name.toLowerCase().includes(q.toLowerCase()));
    }
    if (rate) {
      talkers = talkers.filter((t) => t.talk.rate === Number(rate));
    }
    return talkers;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    readTalkers,
    getTalkerById,
    getTokenByUser,
    addNewTalker,
    changeTalkerInfoById,
    deleteTalker,
    searchTalker,
  };