const mongoose = require('mongoose')
const conn = mongoose.createConnection('mongodb://localhost:27017/notepad');
const ItemSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    txt: {
        type: String,
        required: true,
        unique: true
    }

})

module.exports = mongoose.model('itemModel', ItemSchema)