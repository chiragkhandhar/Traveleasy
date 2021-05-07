const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstname :{
        type: String,
        required: true,
        trim: true
      },
      lastname :{
        type: String,
        required: true,
        trim: true
      },
      email :{
        unique:true,
        type: String,
        required: true,
        trim: true
      },
      password : {
        type: String,
      },
    }, {
      timestamps: true,
});

const User = mongoose.model('User',userSchema)
module.exports = User