var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: String,
    imageURL: String,
    group: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}]
});

module.exports = mongoose.model('Contact', contactSchema);