const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: { type: String },
    name: String, 
    country: String,
    company: String,
    questions: [String], 
    createdAt: { type: Date, default: Date.now }, 
    updatedAt: { type: Date, default: Date.now }, 
});

UserSchema.pre('save', function (next) {
    this.updatedAt = Date.now(); // Update the `updatedAt` field on every save
    next();
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
