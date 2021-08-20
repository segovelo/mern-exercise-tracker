const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const userSchema = new Schema({
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
      },
      firstname: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
      },
      surname: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
      },
      dob : {
        type: Date,
        required: true
      },
      address: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
      },
      telephone: {
        type: String,
        required: true,
        trim: true,
        minlength: 11
      },
      email: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          minlength: 6
      }
    }, 

    {
      timestamps: true,
    }
);


const User = mongoose.model('User', userSchema);


module.exports = User;