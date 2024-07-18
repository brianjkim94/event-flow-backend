const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

userSchema.pre("save", function (next) {
  //hash
  console.log("---------- Password---------,", this.password);
  let hash = bcrypt.hashSync(this.password, 12);
  console.log("----------HASH--------", hash);
  this.password = hash;
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
