const fs = require('fs');
const Sura = require('./sura.js')
const Book = require('./book.js')
// const rob3 = '۞';

const filePath = 'content/hafs.json';

const ayas = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// {
//     "id" : 1,
//     "jozz" : 1,
//     "page" : 1,
//     "sura_no" : 1,
//     "sura_name_en" : "Al-Fātiḥah",
//     "sura_name_ar" : "الفَاتِحة",
//     "line_start" : 2,
//     "line_end" : 2,
//     "aya_no" : 1,
//     "aya_text" : "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ ﰀ",
//     "aya_text_emlaey" : "بسم الله الرحمن الرحيم"
// }

function generateSuras(ayas) {
    const ayasCount = ayas.length;

    let suras = [];
    let suraIndex = 0;
    let ayaIndex = 0;

    while (suraIndex < ayasCount) {
        const firstAya = ayas[ayaIndex]
        let newSura = new Sura(firstAya.sura_name_en, firstAya.sura_name_ar, firstAya.sura_no);
        suras[suraIndex] = newSura;

        while (ayaIndex < ayasCount && ayas[ayaIndex].sura_name_en === newSura.suraNameEN ) {
            newSura.addAya(ayas[ayaIndex].aya_text);
            ayaIndex++;
        }
        suraIndex = ayaIndex;
    }

    return suras;
}


generateSuras(ayas).forEach(sura => sura.suraXHTML());
const newBook = new Book('/book', `book/images/cover.jpg`);
newBook.generateBook();


