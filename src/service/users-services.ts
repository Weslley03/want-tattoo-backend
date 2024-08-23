import { User } from '../models/users-models';
import { IUser } from '../models/users-models';
import { avatarDefault } from '../public-image/dataUndefined';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface IResponse {
  user: {
    _id: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    userAge: number;
    userCity: string;
    userAvatar: string;
  };
  message: string;
  OK: boolean;
};

interface IUserRegistrationData {
    userName: string;
    userEmail: string;
    userPassword: string;
    userAge: number;
    userCity: string;
};

export interface UserUpdatePayload {
  userName?: string;
  userEmail?: string;
  userPassword?: string;
  userAge?: number;
  userCity?: string;
  userAvatar?: string;
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

export async function generateToken(userId: string): Promise<string | undefined>{
  try{
    const SECRET_JWT = process.env.SECRET_JWT;
    if(!SECRET_JWT) throw new Error('SECRET_KEY is not defined in the environment variables');
    return jwt.sign({userId: userId}, SECRET_JWT, {expiresIn: 86400})
  }catch(err){
    console.error('houve um erro na execução da função generateToken', err);
    return undefined;
  }
}

export async function loginUserService(emailUser: string, passwordUser: string): Promise<IResponse | undefined> {
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
    console.error('houve um erro na execução do SERVICE de LOGIN: ', err)
    return undefined
  }
}

export async function registerUserService(body: IUserRegistrationData): Promise<IResponse | undefined>{
  try{
    const bodyData = {
        ...body, 
        userAvatar: avatarDefault,
    };
    const user = await User.create(bodyData);
    if (!user) return statusFailed('could not create user');

    return {
      user: {
        _id: user._id.toString(),
        userName: user.userName,
        userEmail: user.userEmail,
        userPassword: '',
        userAge: user.userAge,
        userCity: user.userCity,
        userAvatar: user.userAvatar
      },
      message: 'CADASTRO OK',
      OK: true
    }
  }catch(err){
    console.error('houve um erro na execução do SERVICE de CADASTRO: ', err);
    return undefined;
  }
}

export async function updateProfileUserService(userID:string, userForUpdate: UserUpdatePayload): Promise<IResponse | undefined> {
  try{
    const user = await User.findByIdAndUpdate(userID, userForUpdate, { new: true }).exec();
    if (!user) return statusFailed('could not update user');

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
      message: 'UPDATE OK',
      OK: true
    }
  } catch(err){
    console.error('houve um erro na execução do SERVICE de UPDATE: ', err);
    return undefined; 
  } 
}