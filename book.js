const Epub = require("epub-gen");
const fs = require("fs");
const path = require("path");
class Book {
    constructor(suras, resourcesRelativePath = 'data') {
        this.suras = suras;
        this.paths = this.generatePathsMap(resourcesRelativePath);
    }

    generatePathsMap(resourcesRelativePath, outputFileName = 'quran.epub') {
        const allFiles = fs.readdirSync(resourcesRelativePath, { recursive: true });
        let paths = {};
        let fonts = [];

        allFiles.forEach(filename => {
            if (filename.includes('cover')) {
                paths.cover = path.resolve(resourcesRelativePath, filename);
            } else if (filename.includes('fonts/')) {
                fonts.push(path.resolve(resourcesRelativePath, filename));
            } else if (filename.includes('opf.ejs')) {
                paths.opfTemplate = path.resolve(resourcesRelativePath, filename);
            } else if (filename.includes('ncx.ejs')) {
                paths.ncxTemplate = path.resolve(resourcesRelativePath, filename);
            } else if (filename.includes('xhtml.ejs')) {
                paths.htmlTocTemplate = path.resolve(resourcesRelativePath, filename);
            } else if (filename.includes('.css')) {
                paths.css = path.resolve(resourcesRelativePath, filename);
            }
        });

        paths.output = path.resolve("output/",outputFileName);
        paths.fonts = fonts;

        return paths;
    }

    generateOptions() {
        const css = fs.readFileSync(this.paths.css, "utf-8");
        const content = this.suras.map(sura => {
            return {
                title: `${sura.suraNumber}-${sura.suraNameEN}`,
                data: sura.suraHTMLBody(),
                filename: `${sura.suraNumber}-${sura.suraNameEN}`
            }
        });
        return {
            title: "Quran",
            author: "Allah",
            cover: this.paths.cover,
            lang: "ar",
            css: css,
            content: content,
            fonts: this.paths.fonts,
            appendChapterTitles: false,
            tocTitle: "Z",
            // identifier: 'urn:uuid:12345678-1234-5678-1234-567812345678'
            customOpfTemplatePath: this.paths.opfTemplate,
            customNcxTocTemplatePath: this.paths.ncxTemplate,
            customHtmlTocTemplatePath: this.paths.htmlTocTemplate
        };
    }

    produceEpub(options = this.generateOptions()) {
        new Epub(options, this.paths.output);
    }
}

module.exports = Book;
