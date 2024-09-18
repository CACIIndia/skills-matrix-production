import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
});

const User = models.User || model('Testing', UserSchema);

export default User;
