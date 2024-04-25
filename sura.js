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
        const suraName = `<h1>${Sura.sura} ${this.suraNameAR} ${Sura.suraSymbol}</h1>`;
        let basmallah = `<h2>${Sura.bismallah}</h2>`;
        if (this.suraNumber === 1){
            basmallah = "";
        }

        return `<div dir="rtl">${suraName}${basmallah}${this.suraAsHtmlParagraph()}</div>`;
    }
}

module.exports = Sura;
