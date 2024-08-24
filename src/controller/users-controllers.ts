import { Request, Response } from "express";
import { generateToken, loginUserService, registerUserService, updateProfileUserService, UserUpdatePayload } from "../service/users-services";

export async function loginUser(req: Request, res: Response){
  try{
    const { userEmail, userPassword } = req.body;
    
    const loginResponse = await loginUserService(userEmail, userPassword);
    if(!loginResponse){
      return res.status(500).json({
        message: "an error occurred while trying to login",
        OK: false,
      });  
    }
    
    const { user, message, OK } = loginResponse;
    if(!OK) return res.status(400).send({ message, OK });

    const userToken = await generateToken(user._id);
    return res.status(200).send({ userToken, message, OK });
  }catch(err){
    console.error('houve um erro na execução da função de LOGIN:', err)
    return res.status(500).send({ error: 'an error occurred while login the user' });
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
    };
    const { user, message, OK } = registerResponse;
    const userToken = await generateToken(user._id);
    return res.status(200).send({ userToken, message, OK });
  }catch(err){
    console.error('houve um erro na execução da função de CADASTRO:', err)
    return res.status(500).send({ error: 'an error occurred while register the user' });
  }
}

export async function updateProfileUser(req: Request, res: Response){
  try{
    const userID = req.params.userID;
    const { userName, userEmail, userPassword, userAge, userCity, userAvatar } = req.body;

    const userUpdatePayload: UserUpdatePayload = {
      ...(userName && { userName }),
      ...(userEmail && { userEmail }),
      ...(userPassword && { userPassword }),
       ...(userAge && { userAge }),
      ...(userCity && { userCity }),
      ...(userAvatar && { userAvatar }),
    };

    const updateResponse = await updateProfileUserService(userID, userUpdatePayload);
    if(!updateResponse){
      return res.status(500).json({
        message: "an error occurred while trying to update",
        OK: false,
      });  
    };
    const { user, message, OK } = updateResponse;
    return res.status(200).send({ user, message, OK });
  }catch(err){
    console.error('houve um erro na execução da função de UPDATE:', err) 
    return res.status(500).send({ error: 'an error occurred while updating the profile' });
  }
};