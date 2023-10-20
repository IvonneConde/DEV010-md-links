//MD-LINKS que llamará a las microfunciones

const fs = require('fs'); 
const path = require('path'); 
const { transformToAbs, getLinks } = require('./lib/app.js');
const { error } = require('console');

const mdLinks = (filePath) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {     //identifica si la ruta existe
      const { absolutePath, extname } = transformToAbs(filePath); // esta es la función para transofrmar la ruta
     if (['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'].includes(extname)) {  //verifica que la extensión markdown es válida
    fs.promises   // modulo para interactuar con el sistema de archivos
    .readFile(absolutePath, 'utf8') //Lee el archivo
    .then((markdownFile) => {
      const links = getLinks(markdownFile, absolutePath); 
      resolve(links);
    }) 
    .catch((error) => {
      reject(error);
    });
    } else {
      reject('Not a markdown file')}
    } else {
      reject('The path doesnt exists');   //sino existe la ruta, rechaza la promesa
    }
  });
};

module.exports = 
mdLinks;
