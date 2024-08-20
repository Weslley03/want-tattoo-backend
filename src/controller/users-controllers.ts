import { Request, Response } from "express";
import { generateToken, loginUserService, registerUserService } from "../service/users-services";

export async function loginUser(req: Request, res: Response){
  try{
    const { emailUser, passwordUser } = req.body; 
    
    const loginResponse = await loginUserService(emailUser, passwordUser);
    if(!loginResponse){
      return res.status(500).json({
        message: "an error occurred while trying to login",
        OK: false,
      });  
    }
    
    const { user, message, OK } = loginResponse;
    const userToken = generateToken(user._id);
    return res.status(200).send({ userToken, message, OK });
  }catch(err){
    console.error('houve um erro na execução da função de LOGIN:', err)
  }
}

export async function registerUser(req: Request, res: Response){
  try{
    const { userName, userEmail, userPassword, userAge, userCity } = req.body;
    if (!userName || !userEmail || !userPassword || !userAge || !userCity) {
        return res.status(400).json({
            message: "there are missing fields to be filled in",
            OK: false,
        });
    }
    const registerResponse = await registerUserService(req.body);
    if(!registerResponse){
        return res.status(500).json({
          message: "an error occurred while trying to register",
          OK: false,
        });  
      }
    const { user, message, OK } = registerResponse;
    const userToken = await generateToken(user._id);
    return res.status(200).send({ userToken, message, OK });
  }catch(err){
    console.error('houve um erro na execução da função de CADASTRO:', err)
  }
}