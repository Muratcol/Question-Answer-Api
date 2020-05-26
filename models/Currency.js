const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CurrencySchema = new Schema({
    name:{
        type:String
    },
    alis:{
        type:String
    },
    satis:{
        type:String
    },
    yuksek:{
        type:String
    },
    dusuk:{
        type:String
    },
    degisim:{
        type:String
    },
    update:{
        type:String
    }
});



module.exports = mongoose.model("Currency", CurrencySchema);
