import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: [true, 'Thiếu dử liệu'] },
  email: { type: String, required: true, unique: true },
});

const UserModel = models.User || model('User', userSchema);

export default UserModel;
