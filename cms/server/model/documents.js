const mongoose = require("mongoose");

var documentSchema = new mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    url: {type: String, required: true},
    children: [{
        id: String,
        name: String,
        url: String,
        description: String,
    }],
    decription: String
});

module.exports = mongoose.model('Document', documentSchema);