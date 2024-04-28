const Sura = require('./sura.js');
const Book = require('./book.js');
const Suras = require('./suras.js');

const suras = generateSuras(ayas);
const newBook = new Book(suras);
newBook.produceEpub();
