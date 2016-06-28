/**
 * Created by Administrator on 5/14/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var msgSchema = new Schema({
    msg_id:String,
    room_id:String,
    text:String,
    person_id:String,
    person_email:String,
    created_at:String
});

var Message = mongoose.model('Message', msgSchema);

module.exports = Message;
