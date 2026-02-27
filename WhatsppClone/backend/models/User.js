const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, sparse: true, index: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  whizrangeUserId: { type: String, unique: true, sparse: true, index: true },
  orgId: { type: String },
  eventId: { type: String, index: true },
  roles: [{ type: String }],
  avatar: { type: String },
  userType: { type: String, default: 'user' },
  isOnline: { type: Boolean, default: false },
  lastSeen: { type: Date, default: Date.now },
  aiPersonality: { type: String },
  trainingLevel: { type: String, default: 'beginner' },
  vulnerabilities: { type: String },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
