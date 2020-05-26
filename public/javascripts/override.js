function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
const cheerio = require('cheerio');
const axios = require('axios');
let bigdata = new Array();

  const Scrappin = new Promise((resolve) => {
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
    resolve(bigdata)
    })
});   


Scrappin
.then(response => console.log(response))
.catch(err => console.log(err))