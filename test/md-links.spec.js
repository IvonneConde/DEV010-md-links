const { mdLinks } = require('../index.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  // it('Should resolve a promise', () => {
  //   expect(mdLinks()).toBe(typeof Promise);
  // });
  it('Reject if path doesnt exist', () => {
    return mdLinks('ivonne/labo/noexiste.md').catch((error) => {
      expect(error).toBe('The path doesnt exist')
    });
  });
  });
