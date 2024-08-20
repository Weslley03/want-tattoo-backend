import { Request, Response } from "express";
import { generateToken, loginUserService } from "../service/users-services";

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
    return res.status(200).send({ userToken });
  }catch(err){
    console.error('houve um erro na execução da função de LOGIN:', err)
  }
}