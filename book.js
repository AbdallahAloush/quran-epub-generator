const Epub = require("epub-gen");
const fs = require("fs");
const path = require("path");
class Book {
    constructor(suras) {
        this.suras = suras;
    }

    generateOptions(){
        const css = fs.readFileSync("data/epub.css", "utf-8");
        const content = this.suras.map(sura => {
            return {
                title: `${sura.suraNumber}-${sura.suraNameEN}`,
                data: sura.suraHTMLBody(),
                filename: `${sura.suraNumber}-${sura.suraNameEN}`
            }
        });
        let option = {
            title: "Quran",
            author: "Allah",
            cover: "/home/abdallahaloush/Documents/quran-epub-generator/data/cover.jpg",
            lang: "ar",
            css: css,
            content: content,
            fonts: ['/home/abdallahaloush/Documents/quran-epub-generator/data/uthmanic_hafs.ttf'],
            appendChapterTitles: false,
            tocTitle: "سُورَةُ"
        }
        return option;
    }

    produceEpub() {
        new Epub(this.generateOptions(), "/home/abdallahaloush/Documents/quran-epub-generator/quran.epub");
    }
}

module.exports = Book;
