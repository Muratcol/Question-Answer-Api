const cheerio = require('cheerio');
const axios = require('axios');
let bigdata = new Array();
const asyncErrorWrapper = require('express-async-handler');
const connectDatabase = require("../database/connectDatabase");
const Currency = require("../../models/Currency");




const Scrapping = asyncErrorWrapper(async (req, res, next) =>{
    
  axios.get("https://kur.doviz.com/").then((response) => {
    const $ = cheerio.load(response.data)
    let denemeler = $('#currencies tbody tr')    
    for (let i = 1; i < denemeler.length+1 ; i++) {
        if ((i === 12) | (i === 6)) continue
        const name = $(`tr:nth-child(${i}) > td:nth-child(1)`).text().trim()
        const alis = $(`tr:nth-child(${i}) > td:nth-child(2)`).text().trim()
        const satis = $(`tr:nth-child(${i}) > td:nth-child(3)`).text().trim()
        const yuksek = $(`tr:nth-child(${i}) > td:nth-child(4)`).text().trim()
        const dusuk = $(`tr:nth-child(${i}) > td:nth-child(5)`).text().trim()
        const degisim = $(`tr:nth-child(${i}) > td:nth-child(6)`).text().trim()
        const update = $(`tr:nth-child(${i}) > td:nth-child(7)`).text().trim()
        bigdata.push({
            name: name,
            alis: alis,
            satis: satis,
            yuksek: yuksek,
            dusuk, dusuk,
            degisim: degisim,
            update: update
        })
    }
    // connectDatabase();
    // Currency.create(bigdata);
    res.status(200)
    .render('home/home', {bigdata: bigdata})
    
    // resolve(bigdata)
    })
});   


module.exports = {
  Scrapping
};



// const Scrappin = new Promise((resolve) => {
//     axios.get("https://kur.doviz.com/").then((response) => {
//     const $ = cheerio.load(response.data)
//     let denemeler = $('#currencies tbody tr')    
//     for (let i = 1; i < denemeler.length+1 ; i++) {
//         if ((i === 12) | (i === 6)) continue
//         const name = $(`tr:nth-child(${i}) > td:nth-child(1)`).text().trim()
//         const alis = $(`tr:nth-child(${i}) > td:nth-child(2)`).text().trim()
//         const satis = $(`tr:nth-child(${i}) > td:nth-child(3)`).text().trim()
//         const yuksek = $(`tr:nth-child(${i}) > td:nth-child(4)`).text().trim()
//         const dusuk = $(`tr:nth-child(${i}) > td:nth-child(5)`).text().trim()
//         const degisim = $(`tr:nth-child(${i}) > td:nth-child(6)`).text().trim()
//         const update = $(`tr:nth-child(${i}) > td:nth-child(7)`).text().trim()
//         bigdata.push({
//             name: name,
//             alis: alis,
//             satis: satis,
//             yuksek: yuksek,
//             dusuk, dusuk,
//             degisim: degisim,
//             update: update
//         })
//     }
//     resolve(bigdata)
//     })
// });   









  // Print the full HTML
// console.log(`Site HTML: ${$.html()}\n\n`)
  
  // Print some specific page content

// document.querySelector("#currencies > tbody > tr:nth-child(1) > td:nth-child(2)")
// document.querySelector("#currencies > tbody > tr:nth-child(1)")
/* <td style="text-align:right;" class="">6,8993</td> */