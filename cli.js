// Aquí se alojarán los errores then y catch
const mdLinks = require('./index.js');

mdLinks('example/README.md', false)
  .then((links) => {
    console.log('validate = false');
    console.table(links);
  })

  .catch((error) => {
    console.error(error);
  });

  mdLinks('README.md', true)
  .then((links) => {
    console.log('true');
    console.table(links);
  })
  .catch((error) => {
    console.error(error);
  });