const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  location: { type: String, required: true }
}, { timestamps: true });

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  let hash = bcrypt.hashSync(this.password, 12);
  this.password = hash;
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
