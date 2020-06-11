const express = require("express");
const router = express.Router();
const asyncErrorWrapper = require("express-async-handler");
const cheerio = require("cheerio");
const axios = require("axios");
let allCurrencies = new Array();

const getAllCurrencies = asyncErrorWrapper(async (req, res, next) => {
  let url = "https://kur.doviz.com/";
  let response;
  allCurrencies = [];
  response = await axios.get(url);
  const $ = await cheerio.load(response.data);
  let denemeler = await $("#currencies tbody tr");
  for (let i = 1; i < denemeler.length + 1; i++) {
    if ((i === 12) | (i === 6)) continue;
    const name = $(`tr:nth-child(${i}) > td:nth-child(1)`).text().trim();
    const alis = $(`tr:nth-child(${i}) > td:nth-child(2)`).text().trim();
    const satis = $(`tr:nth-child(${i}) > td:nth-child(3)`).text().trim();
    const yuksek = $(`tr:nth-child(${i}) > td:nth-child(4)`).text().trim();
    const dusuk = $(`tr:nth-child(${i}) > td:nth-child(5)`).text().trim();
    const degisim = $(`tr:nth-child(${i}) > td:nth-child(6)`).text().trim();
    const update = $(`tr:nth-child(${i}) > td:nth-child(7)`).text().trim();
    allCurrencies.push({
      name: name,
      alis: alis,
      satis: satis,
      yuksek: yuksek,
      dusuk : dusuk,
      degisim: degisim,
      update: update,
    });
  }
  return res.status(200).json({
    success: true,
    data: allCurrencies,
  });
});







module.exports = {
  getAllCurrencies,
};
