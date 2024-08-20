import { Schema, model, Document } from "mongoose";

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
  _id: { type: String, unique: true },
  userName: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true, unique: true },
  userPassword: { type: String, required: true },
  userAge: { type: Number, required: true },
  userCity: { type: String, required: true },
  userAvatar: { type: String, required: true },
})

export const User = model<IUser>('User', UserSchema);