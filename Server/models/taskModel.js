const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const taskSchema = new Schema({ 
    'groupId': String,
    'title': String,
    'description' : String,
    'endDate' : Date,
    'reminderOffset' : Number,
    'isCompleted' : Boolean,
    'tags' : [{
        type: Schema.Types.ObjectId,
	 	ref: 'tag'
    }]
});

module.exports = mongoose.model('task', taskSchema);;