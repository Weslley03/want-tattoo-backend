import { User } from '../models/users-models';
import { IUser } from '../models/users-models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface IloginResponse {
  user: {
    _id: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    userAge: number;
    userCity: string;
    userAvatar: string;
  }
  message: string;
  OK: boolean;
}

const statusFailed = (messageError: string) => {
  return {
    user: {
      _id: '',
      userName: '',
      userEmail: '',
      userPassword: '',
      userAge: 0,
      userCity: '',
      userAvatar: ''
    },
    message: messageError,
    OK: false
  }
};

export async function loginUserService(emailUser: string, passwordUser: string): Promise<IloginResponse | undefined> {
  try{
    const user = await User.findOne({ userEmail: emailUser }).select('+userPassword') as IUser | null;
    if (!user) return statusFailed('user not fould');

    const passwordIsValid = bcrypt.compareSync(passwordUser, user.userPassword)
    if(!passwordIsValid) return statusFailed('incorrect username or password');

    return {
      user: {
        _id: user._id.toString(),
        userName: user.userName,
        userEmail: user.userEmail,
        userPassword: user.userPassword,
        userAge: user.userAge,
        userCity: user.userCity,
        userAvatar: user.userAvatar
      },
      message: 'LOGIN OK',
      OK: true
    }
  }catch(err){
    console.error('houve um erro na execução do SERVICE de LOGIN:', err)
    return undefined
  }
}

export async function generateToken(userId: string): Promise<string | undefined>{
  try{
    const SECRET_JWT = process.env.SECRET_JWT;
    if(!SECRET_JWT) throw new Error('SECRET_KEY is not defined in the environment variables');
    return jwt.sign({id: userId}, SECRET_JWT, {expiresIn: 86400})
  }catch(err){
    console.error('houve um erro na execução do SERVICE de LOGIN:', err);
    return undefined;
  }
}