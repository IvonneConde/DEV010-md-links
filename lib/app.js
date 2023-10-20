//microfunciones

//crear una función para confirmar que es absoluta y extensión del archivo
const path = require('path');
const { marked } = require('marked');

const transformToAbs = (filePath) => {    // nombre de la función
    const absolutePath = path.resolve(filePath);  //guardo en la const las rutas convertidas
    const extname = path.extname(absolutePath);  //extrae el nombre de las rutas convertidas
    return { absolutePath, extname };
}

// función para leer el contenido y extraer los links
const getLinks = (markdownFile, absolutePath) => {
    const renderer = new marked.Renderer();  // confugura markdown
    const arrLinks = []; // este es el arreglo para devolver los links
    renderer.link = (href, title, text) => {
        arrLinks.push({ href, text, file: absolutePath });
    };
    marked(markdownFile, { renderer });
    return arrLinks;
};

module.exports = {
    transformToAbs,
    getLinks
}