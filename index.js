//MD-LINKS que llamará a las microfunciones

const fs = require('fs'); 
const path = require('path'); 
const { transformToAbs, getLinks } = require('./lib/app.js');
const { validateLinks } = require('./lib/app.js');

const mdLinks = (filePath, validate = false) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {     //identifica si la ruta existe
      const { absolutePath, extname } = transformToAbs(filePath); // obtiene la ruta absoluta y la extención del archivo
     if (['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'].includes(extname)) {  //verifica que la extensión markdown es válida
    // aquí lee el archivo y lo convierte en string -->
      fs.promises   // modulo para interactuar con el sistema de archivos
    .readFile(absolutePath, 'utf8') //Lee el archivo y lo convierte a string
    .then((markdownFile) => {
      // para extraer los links y su ruta
      const links = getLinks(markdownFile, absolutePath);
      if (validate) {   // Si se debe validar, llama a validateLinks para validar los enlaces
        //validamos los links con validateLinks
        validateLinks(links)
        .then((validateLinks) => {
          resolve(validateLinks); // Si no se valida, resuelve con los enlaces sin cambios
        })
        .catch(reject);
      } else {
      resolve(links); // resolvemos los links que no son válidos
      }
    .catch((error) => {
      reject(error);
    });
    } else {
      reject('Not a markdown file')}  // Rechaza la promesa si la extensión no es válida
    } else {
      reject('The path doesnt exists');   //sino existe la ruta, rechaza la promesa
    }
  });
};

module.exports = mdLinks;
