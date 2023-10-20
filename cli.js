// Aquí se alojarán los errores then y catch
const mdLinks = require('./index.js');

mdLinks('example/README.md')
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });