const fs = require('fs');
const Sura = require('./sura.js');

class Suras {
    constructor (ayasPath = 'data/hafs.json') {
        this.ayas = JSON.parse(fs.readFileSync(ayasPath, 'utf-8'));
    }

    generateSuras() {
        const ayasCount = this.ayas.length;

        let suras = [];
        let suraIndex = 0;
        let ayaIndex = 0;

        while (suraIndex < ayasCount) {
            const firstAya = this.ayas[ayaIndex]
            let newSura = new Sura(firstAya.sura_name_en, firstAya.sura_name_ar, firstAya.sura_no);
            suras.push(newSura);

            while (ayaIndex < ayasCount && this.ayas[ayaIndex].sura_name_en === newSura.suraNameEN ) {
                delete this.ayas[ayaIndex].aya_text_emlaey;
                delete this.ayas[ayaIndex].sura_no;
                delete this.ayas[ayaIndex].sura_name_ar;
                delete this.ayas[ayaIndex].sura_name_en;
                delete this.ayas[ayaIndex].id;
                newSura.addAya(this.ayas[ayaIndex]);
                ayaIndex++;
            }
            suraIndex = ayaIndex;
        }

        return suras;
    }
}

module.exports = Suras;
