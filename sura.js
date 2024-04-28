class Sura {
    static bismallah = '\uF04C';
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
        let p = this.ayas.reduce((ayasP, aya) =>{
            ayasP += `${aya.aya_text} `;
            return ayasP;
        } , "<p>");
        p+="</p>";
        return p
    }

    suraHTMLBody(){
        const suraName = `<h1>${Sura.sura} ${this.suraNameAR}</h1>`;
        let basmallah = `<h2>${Sura.bismallah}</h2>`;
        if (this.suraNumber === 1){
            basmallah = "";
        }

        return `<div dir="rtl">${suraName}${basmallah}${this.suraAsHtmlParagraph()}</div>`;
    }
}

module.exports = Sura;
