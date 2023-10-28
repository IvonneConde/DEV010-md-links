// const mdLinks = require('../index.js');
const { transformToAbs } = require('../lib/app.js');
const { getLinks } = require('../lib/app.js');
const { validateLinks } = require('../lib/app.js');



// describe('mdLinks', () => {
//   it('Should return a promise', () => {
//     const result = mdLinks('rutainvalida.md'); 
//     return result.catch(error => {
//       expect(error).toBe('The path doesnt exists'); 
//     });
//   });
//   it('Should resolve with links for a valid Markdown file', () => {
//     const filePath = 'C:/Users/Laboratoria/Downloads/WEB DEVELOPER/Proyecto 4/DEV010-md-links/example/README.md';
//     return mdLinks(filePath).then(links => {
//       // Verifica si los links son los esperados para un archivo Markdown válido
//       const filteredLinks = links.filter(link => link.text === 'Markdown' || link.text === 'Node.js');
//       expect(filteredLinks).toEqual([
//         { href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown', file: 'C:/Users/Laboratoria/Downloads/WEB DEVELOPER/Proyecto 4/DEV010-md-links/README.md' },
//         { href: 'https://nodejs.org/', text: 'Node.js', file: 'C://Users//Laboratoria//Downloads//WEB DEVELOPER//Proyecto 4//DEV010-md-links//README.md' },
//       ]);
//     });
//   });
// });

     //test para la función que transforma a absoluta
describe('transformToAbs', () => {
  it('should convert a relative path to an absolute path', () => {
    const relativePath = './example.md'; // Ruta relativa
    const result = transformToAbs(relativePath);
    // Asegurarse de que la función devuelva un objeto con una propiedad 'absolutePath'
    expect(result).toHaveProperty('absolutePath');
    // Verificar que la propiedad 'absolutePath' sea una cadena (ruta absoluta)
    expect(typeof result.absolutePath).toBe('string');
    // Verificar si la ruta absoluta es la esperada
  });
});
// Test para la función que extrae los links
test('should extract the links from the Markdown content', () => {
  const markdownContent = '[Google](https://www.google.com)\n[Example](https://www.example.com)';
  const absolutePath = '/ruta/absoluta/al/archivo.md';
  
  const links = getLinks(markdownContent, absolutePath);
  
  expect(links).toEqual([
    { href: 'https://www.google.com', text: 'Google', file: '/ruta/absoluta/al/archivo.md' },
    { href: 'https://www.example.com', text: 'Example', file: '/ruta/absoluta/al/archivo.md' },
  ]);
});


// Mock de la función 'fetch'
const fetchMock = jest.fn((url) => {
  if (url === 'https://google.com') {
    return Promise.resolve({ status: 200, ok: true });
  } else if (url === 'https://example.com') {
    return Promise.resolve({ status: 404, ok: false });
  }
});

global.fetch = fetchMock;


describe('validateLink', () => {
  test(' should resolve the promise with the valid links', () => {
    const links = [
      { href: 'https://google.com', text: 'Google' },
      { href: 'https://example.com', text: 'Example' },
    ];

    return validateLinks(links).then((result) => {
      expect(result).toEqual([
        { href: 'https://google.com', text: 'Google', ok: 'ok', status: 200 },
        { href: 'https://example.com', text: 'Example', ok: 'fail', status: 404 },
      ]);
    });
  });
});
