class Sura {
    static bismallah = "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ";
    static suraSymbol = '؁';
    static sura = "سُورَةُ";

    constructor (suraNameEN, suraNameAR, suraNumber){
        this.suraNameEN = suraNameEN;
        this.suraNameAR = suraNameAR;
        this.suraNumber = suraNumber;
        this.ayas = [];
    }

    addAya(aya) {
        this.ayas.push(aya);
    }

    suraAsHtmlParagraph() {
        let p = this.ayas.reduce((ayasP, aya)=>ayasP+=`${aya.aya_text} `, "<p>");
        p+="</p>";
        return p
    }

    suraHTMLBody(){
        return `<h1>${Sura.sura} ${this.suraNameAR} ${Sura.suraSymbol}</h1><h2>${Sura.bismallah}</h2><p>${this.ayas}</p>`;
    }
}

module.exports = Sura;
