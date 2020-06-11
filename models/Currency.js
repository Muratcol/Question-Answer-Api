const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CurrencySchema = new Schema({
    dollar:{
        type:Object
    },
    euro:{
        type:Object
    },
    gbp:{
        type:Object
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});



module.exports = mongoose.model("Currency", CurrencySchema);
