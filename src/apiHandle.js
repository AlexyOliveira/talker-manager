const fs = require('fs').promises;
const path = require('path');

async function readTalkers() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, './talker.json'), 'utf-8');
    if (data) {
          const talkers = JSON.parse(data);
    console.log(talkers);
   return talkers;
    }
    if (!data) {
     return [];
    }
  } catch (error) {
    console.error(`Erro na leitura ${error}`);
  }
}

module.exports = {
  readTalkers,
};

// async function readSimpsonsNameById(id) {
//   try {
//     const data = await fs.readFile("./data/simpsons.json", "utf-8");
//     const names = JSON.parse(data);
//     const name = names.find((n) => n.id === id.toString());

//     console.log(name);
//     if (!name) {
//       throw new Error("id não encontrado");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function removeSimpsonById() {
//   const data = await fs.readFile("./data/simpsons.json");
//   const names = JSON.parse(data);
//   const name = names.filter((n) => n.id !== "10" && n.id !== "6");

//   fs.writeFile("./data/simpsons.json", JSON.stringify(name));
// }

// async function createSimpsonsFamilyFile() {
//     const data = await fs.readFile("./data/simpsons.json");
//     const names = JSON.parse(data);
//     const familyIds = ['1', '2', '3', '4']
//     const simpsonsFamily = names.filter((name) => familyIds.includes(name.id));

//     await fs.writeFile("./data/simpsonsFamily.json", JSON.stringify(simpsonsFamily))
//     console.log(simpsonsFamily)
//   }
  
//   async function addCharacter() {
//     const data = await fs.readFile("./data/simpsons.json");
//     const names = JSON.parse(data);
    
//     names.push({id: '8', name: 'Nelson Muntz'})
   
//     await fs.writeFile("./data/simpsons.json", JSON.stringify(names) )
//   }

//   addCharacter();
