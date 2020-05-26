const {Scrapping} = require('../../helpers/currencyScrapper/currency_finder')
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

 
setInterval(() => {
  const data = Scrapping;
  for(var i=0; i < 7; i++) {       
    document.querySelector(`body > div > div:nth-child(3) > div > div:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(${data[0].name})`)
    document.querySelector(`body > div > div:nth-child(3) > div > div:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(${data[0].alis})`)
    document.querySelector(`body > div > div:nth-child(3) > div > div:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(${data[0].satis})`)
   }

  
}, 5000);
// document.querySelector("body > div > div:nth-child(3) > div > div:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(2)")