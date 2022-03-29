const fs = require('fs');
const {promisify} = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

(async () => {
  const json = await readFile('formatted.json');
  const cities = JSON.parse(json);

  // const formatted = {};
  // cities.forEach(el => {
  //   const initial = el.name.charAt(0).toLowerCase();
  //   console.log(initial);
  //   if(!formatted[initial]) formatted[initial] = []
  //   formatted[initial] = [...formatted[initial], el];
  // });
  // const stringified = JSON.stringify(formatted);
  // await writeFile('formatted.json', stringified);
  console.log(Object.keys(cities).sort())
})();