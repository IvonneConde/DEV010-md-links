//microfunciones

//crear una función para confirmar que es absoluta y extensión del archivo
const path = require('path');
const { marked } = require('marked');  // Librería para convertir de markdown --> html y
// const fetch = require('node-fetch');

const transformToAbs = (filePath) => {    // nombre de la función
    const absolutePath = path.resolve(filePath);  //guardo en la const las rutas convertidas
    const extname = path.extname(absolutePath);  //extrae el nombre de las rutas convertidas
    return { absolutePath, extname };
}

// función para leer el contenido y extraer los links
const getLinks = (markdownFile, absolutePath) => {
    const renderer = new marked.Renderer();  // confugurarenderiza) markdown a una representación visual
    const arrLinks = []; // este es el arreglo para devolver los links
    renderer.link = (href, title, text) => {
        arrLinks.push({ href, text, file: absolutePath });
    };
    marked(markdownFile, { renderer });
    return arrLinks;
};

const validateLinks = (links) => {
    const validLinks = links.filter(link => !link.href.startsWith('#') && !link.href.startsWith('./'));
    return Promise.all(
        validLinks.map(link => {
            return fetch(link.href)   //solicituf HHTP a c/link p/validar su status
            .then(response => {
                link.status = response.status;
                link.ok = response.ok ? 'ok' : 'fail';
                return link;
            })
            .catch(error => {
                link.status = 500;
                link.ok = 'fail';
                return link;
            });
        })
    );
};

module.exports = {
    transformToAbs,
    getLinks,
    validateLinks,
};