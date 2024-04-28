const fs = require('fs');
const Sura = require('./sura.js')
const Book = require('./book.js');

const ayas = JSON.parse(fs.readFileSync('data/hafs.json', 'utf-8'));

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
        suras.push(newSura);

        while (ayaIndex < ayasCount && ayas[ayaIndex].sura_name_en === newSura.suraNameEN ) {
            delete ayas[ayaIndex].aya_text_emlaey;
            delete ayas[ayaIndex].sura_no;
            delete ayas[ayaIndex].sura_name_ar;
            delete ayas[ayaIndex].sura_name_en;
            delete ayas[ayaIndex].id;
            newSura.addAya(ayas[ayaIndex]);
            ayaIndex++;
        }
        suraIndex = ayaIndex;
    }

    return suras;
}

const suras = generateSuras(ayas);
const newBook = new Book(suras);
newBook.produceEpub();
