const Sura = require('./sura.js');
const Book = require('./book.js');
const Suras = require('./suras.js');

const suras = new Suras();
const surasArr = suras.generateSuras()
const newBook = new Book(surasArr);
newBook.produceEpub();
