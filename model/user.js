const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  name: { type: String, required: false },
},
  { timestamps: true }
);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;