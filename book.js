// const Epub = require("epub-gen");
class Book{
    constructor(contentPath, coverPath) {
        this.contentPath = contentPath;
        this.coverPath = coverPath;
        // this.spine = this.createBookSpine();
        // this.toc = this.createTOC();
    }

    createBookSpine(countChapters = 114){
        let spine = [];
        let i = 0;

        for(i=0; i<countChapters; i++){
            const filename = `${i+1}.html`;
            spine.push(filename);
        }
        return spine;
    }

    createTOC(countChapters = 114) {
        let toc = [];
        let i = 0;

        for(i=0; i<countChapters; i++){
            const filename = `${i+1}.html`;
            toc.push([{ label: `${i+1}`, href: `${filename}`}]);
        }
        return toc;
    }

    generateBook() {
        let toc = [];
        let i = 0;
        let spine = [];

        for(i=0; i<114; i++){
            const filename = `${i+1}.html`;
            spine.push(filename);
            toc.push([{ label: `${i+1}`, href: `${filename}`}]);
        }
        console.log(this.contentPath);
        const option = {
            contentDir: this.contentPath,
            spine,
            toc,
            cover: this.coverPath,
            simpleMetadata: {
                author: 'Quran',
                title: 'Quran',
                language: 'ar'
            }
        }
        const creator = new EPUBCreator(option);
        creator.create('quran.epub').catch((error) => console.log(error));
    }

    //TODO: loop on suras to generate the content
}

module.exports = Book;
// const spine = ['front.html'];
// const toc = [];
// for (let i = 1, i <= 24; i++) {
//     const number = i < 10 ? `0${i}` : `${i}`;
//     const fileName = `book${number}.html`;
//     spine.push(fileName);
//     toc.push([{ label: `Book ${i}`, href: fileName }]);
// }
// spine.push('end.html');

// const options = {
//     contentDir: '/odissey',
//     spine,
//     toc,
//     cover: 'images/cover.jpg',
//     simpleMetadata: {
//         author: 'Homer',
//         title: 'Odissey'
//     }
// };

// const creator = new EPUBCreator(options);
// creator.create('odissey.epub')
//     .catch((error) => console.log(error));
