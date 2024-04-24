const fs = require('fs');
const createHtml = require('create-html');

class Sura {
    static bismallah = "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ";
    static suraSymbol = '؁';
    static sura = "سُورَةُ";

    constructor (suraNameEN, suraNameAR, suraNumber){
        this.suraNameEN = suraNameEN;
        this.suraNameAR = suraNameAR;
        this.suraNumber = suraNumber;
        this.ayas = '';
    }

    addAya(aya) {
        this.ayas += `${aya} `;
    }

    suraMarkdown(){
        const outputFile = this.outputFile('md');
        const content = `# ${Sura.sura} ${this.suraNameAR}\n\n${Sura.bismallah}\n\n${this.ayas}`;
        fs.writeFileSync(outputFile, content);
    }

    suraXHTML(){
        const title = "Quran";
        const outputFile = this.outputFile("html");
        const content = this.suraHTMLBody();

        const html = createHtml({
            title: title,
            lang: "ar",
            dir: "rtl",
            body: content
        });

        fs.writeFileSync (outputFile, html);

    }

    suraHTMLBody(){
        return `<h1>${Sura.sura} ${this.suraNameAR} ${Sura.suraSymbol}</h1><h2>${Sura.bismallah}</h2><p>${this.ayas}</p>`;
    }

    suraOutputFile(extension) {
        const outputFile = `book/content/${this.suraNumber}-${this.suraNameEN}.${extension}`;
        return outputFile;
    }

    suraHTMLHead(){

    }


}

module.exports = Sura;
