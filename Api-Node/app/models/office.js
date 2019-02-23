const mongoose = require('../../database/mongo_connect');
const OfficeSchema = new mongoose.Schema({
  
    office_title: {
        type: String,
        require: true,
        lowercase: true,

    },

    remuneration: {
        type: String,
        require: true
    },


    InsertionDate: {
        type: Date,
        default: Date.now,
    },
});



const Office = mongoose.model('Office', OfficeSchema);
module.exports = Office;