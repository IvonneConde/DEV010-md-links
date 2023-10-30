//microfunciones

//crear una función para confirmar que es absoluta y extensión del archivo
const path = require('path');
const { marked } = require('marked');  // Librería para convertir de markdown --> html y
// const fetch = require('node-fetch');

const transformToAbs = (filePath) => {    // nombre de la función
    const absolutePath = path.resolve(filePath);  //guardo en la const las rutas convertidas
    const extname = path.extname(absolutePath);  //extrae la extensión del archivo
    return { absolutePath, extname };
}

// función para leer el contenido y extraer los links
const getLinks = (markdownFile, absolutePath) => {
    const renderer = new marked.Renderer();  // configuramos el renderizador para mardown
    const arrLinks = []; // este es el arreglo para devolver los links
    renderer.link = (href, title, text) => {
        arrLinks.push({ href, text, file: absolutePath }); // extraemos los enlaces y los guardamos en el arreglo
    };
    marked(markdownFile, { renderer }); // procesamos el archivo markdown 
    return arrLinks;  //retornamos los enlaces
};

const validateLinks = (links) => {
    const validLinks = links.filter(link => !link.href.startsWith('#') && !link.href.startsWith('./'));
    return Promise.all(
        validLinks.map(link => {
            return fetch(link.href)   //solicituf HHTP a c/link p/validar su status
            .then(response => {                           //se toma esa respuesta y extrae el 
                link.status = response.status;            //estad odel enlace response.status 
                link.ok = response.ok ? 'ok' : 'fail';    //y nos da el código del estado http
                return link;                              // devuelve el objto link con status y ok actualizados
            })
            .catch(error => {         //si ocurre algún error se captura en el catch
                link.status = 500;    //se establece el status en 500 error del servidor
                link.ok = 'fail';     //el ok se establece en fail
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