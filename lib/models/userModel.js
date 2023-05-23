import axios from 'axios';
import { Schema, model, models } from 'mongoose';
//permission   robot, member,admin
const userSchema = new Schema(
  {
    fullname: { type: String, required: true },
    username: {
      type: String,
      required: true,
      unique: [true, 'tài khoản đã tồn tại !'],
    },
    avatar: { type: String, default: '/images/defaultlavata.png' },
    password: { type: String, required: true },
    permission: { type: String, default: 'member' },
    blocked: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
    accessToken: { type: String, require: true },
    refreshToken: { type: String, require: true },
  },
  { timestamps: true }
);

const UserModel = models.User || model('User', userSchema);

export default UserModel;
