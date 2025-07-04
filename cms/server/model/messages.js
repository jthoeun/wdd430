const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
   id: { type: String, required: true },
   subject: { type: String, required: true },
   msgText: { type: String, required: true },
   sender: { 
     type: String, 
     ref: 'Contact',
     refPath: 'id' 
   }
});

module.exports = mongoose.model('Message', messageSchema)