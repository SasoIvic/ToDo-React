const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const groupSchema = new Schema({
    'name' : String,
    'importance' : Number,
    'tags' : [{
        type: Schema.Types.ObjectId,
	 	ref: 'tag'
    }]
});

module.exports = mongoose.model('group', groupSchema);