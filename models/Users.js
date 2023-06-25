const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: undefined
    },
    city :{
        type: String,
        default: undefined
    },
    refreshToken: String
})

module.exports = mongoose.model('Users',userSchema);