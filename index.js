const fs = require('fs');
const rob3 = '۞';
const bismallah = "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ";
const sura_name_symbol = '؁';
const sura = "سُورَةُ"
const filePath = 'hafs.json';
const firstAya = 1;

const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

let sura_name = data.filter(aya => aya.aya_no === 1).reduce((sura_name, aya) => {
    sura_name[aya.sura_name_en] = aya.sura_name_ar;
    return sura_name
}, {});

data.forEach(aya => {
    if (aya.page === 3){
        fs.writeFileSync("page3.txt", `${aya.aya_text} `, { flag: 'a' });
    }
});
fs.writeFileSync('sura_name.json',JSON.stringify(sura_name))


function print_sura_logo(suraNames) {
    for(let x in suraNames){
        const print = `${sura} ${suraNames[x]} ${sura_name_symbol} \n`
        fs.writeFileSync('sura_name.txt', print, { flag: 'a' })
    }

}
// {
//     "id" : 1363,
//     "jozz" : 11,
//     "page" : 207,
//     "sura_no" : 9,
//     "sura_name_en" : "At-Taubah",
//     "sura_name_ar" : "التوبَة",
//     "line_start" : 12,
//     "line_end" : 14,
//     "aya_no" : 128,
//     "aya_text" : "لَقَدۡ جَآءَكُمۡ رَسُولٞ مِّنۡ أَنفُسِكُمۡ عَزِيزٌ عَلَيۡهِ مَا عَنِتُّمۡ حَرِيصٌ عَلَيۡكُم بِٱلۡمُؤۡمِنِينَ رَءُوفٞ رَّحِيمٞ ﱿ",
//     "aya_text_emlaey" : "لقد جاءكم رسول من أنفسكم عزيز عليه ما عنتم حريص عليكم بالمؤمنين رءوف رحيم"
// }
function generateText(jsonData) {
    let surahs = {}
    jsonData.forEach(aya => {
        if(aya.aya_no === firstAya){
            let add = `# ${sura} ${aya.sura_name_ar} ${sura_name_symbol}\n## ${bismallah}\n`;
            add += `${aya.aya_text}`;
            // const output_file = `output/${aya.sura_name_en}.md`;
            surahs[aya.sura_name_en] = add
        } else {
            surahs[aya.sura_name_en] += aya.aya_text;
        }
    });
    return surahs
}
print_sura_logo(sura_name);

function generateFiles(surahs) {
    for (surah in surahs) {
        const outputFile = `output/markdown/${surah}.md`
        fs.writeFileSync(outputFile, surahs[surah]);
    }
}


console.log("done");
generateFiles(generateText(data));
