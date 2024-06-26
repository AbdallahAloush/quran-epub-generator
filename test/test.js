const assert = require("assert");
const Suras = require("../suras.js");
const Book = require("../book.js");
const path = require("path");
const fs = require("fs")

const newSuras = new Suras();
const suras = newSuras.generateSuras();

describe("Suras", () => {
    describe("#genereateSuras", () => {
        it("Should create an array that has a length of 114", () => {
            assert.strictEqual(newSuras.ayas.length, 6236)
            assert.strictEqual(suras.length, 114);
        });

        it("Should have the suras in correct order", () => {
            const firstSuraInArray = suras[0];
            const fifthSuraInArray = suras[4];
            const lastSuraInArray = suras[113];

            assert.strictEqual(firstSuraInArray.suraNumber, 1);
            assert.strictEqual(firstSuraInArray.suraNameEN, "Al-Fātiḥah");

            assert.strictEqual(fifthSuraInArray.suraNumber, 5);
            assert.strictEqual(fifthSuraInArray.suraNameEN, "Al-Mā’idah");

            assert.strictEqual(lastSuraInArray.suraNumber, 114);
            assert.strictEqual(lastSuraInArray.suraNameEN, "An-Nās");
        });
    });
});

describe("Sura", () => {
    const firstSuraInArray = suras[0];
    const fifthSuraInArray = suras[4];
    const lastSuraInArray = suras[113];
    describe("#addAya", () => {
        it("Should have the ayas in correct order", () => {
            const fatihahAyas = firstSuraInArray.ayas;
            const annasAyas = lastSuraInArray.ayas;

            assert.strictEqual(fatihahAyas[0].aya_no, 1);
            assert.strictEqual(fatihahAyas[1].aya_no, 2);
            assert.strictEqual(fatihahAyas[5].aya_no, 6);

            assert.strictEqual(annasAyas[0].aya_no, 1);
            assert.strictEqual(annasAyas[1].aya_no, 2);
            assert.strictEqual(annasAyas[5].aya_no, 6);

        });
    });
});

describe("Book", () => {
    const newBook = new Book(suras, "data");
    describe("#generatePathsMap", () => {
        it("fonts property should be an array", () => {
            const fontsCount = fs.readdirSync('data/fonts').length;
            assert.strictEqual(newBook.paths.fonts.length, fontsCount);
        });

        it("Should generate correct file paths", () => {
            const cssPath = path.resolve('data/styles/epub.css');
            const opfPath = path.resolve('data/templates/content.opf.ejs');
            const coverPath = path.resolve('data/cover.jpg');

            assert.strictEqual(newBook.paths.opfTemplate, opfPath);
            assert.strictEqual(newBook.paths.css, cssPath);
            assert.strictEqual(newBook.paths.cover, coverPath);
        });
    });
});
