const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const tagSchema = new Schema({
    'name' : String,
    'color' : String
});

module.exports = mongoose.model('tag', tagSchema); 