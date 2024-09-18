var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   name:String,
   email:String,
 
});
module.exports =mongoose.models.User || mongoose.model('User', userSchema);    