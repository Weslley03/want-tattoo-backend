import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt"

export interface IUser extends Document {
 _id: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userAge: number;
  userCity: string;
  userAvatar: string;
}

const UserSchema = new Schema<IUser>({
  //_id: { type: Schema.Types.ObjectId, index: true },
  userName: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true, unique: true },
  userPassword: { type: String, required: true },
  userAge: { type: Number, required: true },
  userCity: { type: String, required: true },
  userAvatar: { type: String, required: true },
})

UserSchema.pre('save', async function(next) {
  this.userPassword = await bcrypt.hash(this.userPassword, 10)
  next();
})

export const User = model<IUser>('User', UserSchema);