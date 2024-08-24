import { Request, response, Response } from "express";
import { loginUser, registerUser, updateProfileUser } from "../../src/controller/users-controllers";
import { loginUserService, registerUserService, updateProfileUserService, generateToken } from "../../src/service/users-services";
import { json } from "stream/consumers";

jest.mock('../../src/service/users-services');

const mockedloginUserService = loginUserService as jest.Mock;
const mockedRegisterUserService = registerUserService as jest.Mock;
const mockedUpdateProfileUserService = updateProfileUserService as jest.Mock;
const mockedGenerateToken = generateToken as jest.Mock;

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
  
afterEach(() => {
  jest.restoreAllMocks();
});

describe('loginUser CONTROLLER', () => {
  it('should return a token and message on successful login', async () => {
    const req = {
      body: {
        userEmail: 'testing@examble.com',
        userPassword: 'password123',
      },
    } as Request;
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;

    const user = { _id: '123', userName: 'userName123', userEmail: 'testing@examble.com' };
    mockedloginUserService.mockResolvedValue({
      user,
      message: 'LOGIN OK',
      OK: true,
    })
    mockedGenerateToken.mockReturnValue('token123');

    await loginUser(req, res);

    expect(mockedloginUserService).toHaveBeenCalledWith('testing@examble.com', 'password123');
    expect(mockedGenerateToken).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ userToken: 'token123', message: 'LOGIN OK',  OK: true });
  })

  it('should return a 500 status if login fails', async () => {
    const req = {
      body: {
        emailUser: 'testing@examble.com',
        passwordUser: 'wrongpassword'
      }
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),  
    } as unknown as Response;

    mockedloginUserService.mockResolvedValue(undefined);

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'an error occurred while trying to login',
      OK: false, 
    });
  });
});

describe('registerUser CONTROLLER', () => {
  it('should return a token and message on successful register user', async () => {
    const req = {
      body: {
        userName: 'testing123',
        userEmail: 'testing@examble.com',
        userPassword: 'password123',
        userAge: 20,
        userCity: 'Maringá',      
      }
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;

    const user = { _id: '123', userName: 'testing123', userEmail: 'testing@examble.com', userPassword: 'password123', userAge: 20, userCity: 'Maringá' };
    mockedRegisterUserService.mockResolvedValue({
      user, 
      message: 'CADASTRO OK',
      OK: true,
    });
    mockedGenerateToken.mockReturnValue('token123')

    await registerUser(req, res);

    expect(mockedRegisterUserService).toHaveBeenCalledWith({ userName: 'testing123', userEmail: 'testing@examble.com', userPassword: 'password123', userAge: 20, userCity: 'Maringá' });
    expect(mockedGenerateToken).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ userToken: 'token123', message: 'CADASTRO OK',  OK: true })
  });

  it('should return a 500 status if register user fails', async () => {
    const req = {
        body: {
          userName: 'testing123',
          userEmail: 'testing@examble.com',
          userPassword: 'password123',
          userAge: 20,
          userCity: 'Maringá',      
        }
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      } as unknown as Response;

      mockedRegisterUserService.mockResolvedValue(undefined);

      await registerUser(req, res);

      expect(mockedRegisterUserService).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'an error occurred while trying to register', OK: false })
  });
});

describe('updateProfileUser CONTROLLER', () => {
  it('should return updated user data on successful update', async () => {
    const req = {
      params: { userID: '123',},
      body: {
        userName: 'updateName',
        userEmail: 'updated@examble.com',
        userPassword: 'newpassword',
        userAge: 25,
        userCity: 'New City',   
        userAvatar: 'new-avatar-url',
      },
    } as Partial<Request> as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as Partial<Response> as Response;

    
  const user = {
    _id: '123',
    userName: 'Updated Name',
    userEmail: 'updated@example.com',
    userPassword: 'newpassword',
    userAge: 25,
    userCity: 'New City',
    userAvatar: 'new-avatar-url',
  };

  mockedUpdateProfileUserService.mockResolvedValue({
    user, 
    message: 'UPDATE OK',
    OK: true,
  });

  await updateProfileUser(req, res);

  expect(mockedUpdateProfileUserService).toHaveBeenCalledWith('123', {
    userName: 'updateName',
    userEmail: 'updated@examble.com',
    userPassword: 'newpassword',
    userAge: 25,
    userCity: 'New City',
    userAvatar: 'new-avatar-url',
  });
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.send).toHaveBeenCalledWith({
    user,
    message: 'UPDATE OK',
    OK: true,
  });
  });

  it('should return a 500 status if updateProfileUser fails', async () => {
    const req = {
      params:  { userID: '123' },
      body: {
        userName: 'updatedName',
        userEmail: 'updated@example.com',
        userPassword: 'newpassword',
        userAge: 25,
        userCity: 'New City',
        userAvatar: 'new-avatar-url',
      }
    } as Partial<Request> as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as Partial<Response> as Response;

    mockedUpdateProfileUserService.mockResolvedValue(undefined);

    await updateProfileUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "an error occurred while trying to update",
      OK: false,
    });
  });

  it('should return a 500 status if an exception is thrown ', async () => {
    const req = {
      params:  { userID: '123' },
      body: {
        userName: 'updatedName',
        userEmail: 'updated@example.com',
        userPassword: 'newpassword',
        userAge: 25,
        userCity: 'New City',
        userAvatar: 'new-avatar-url',
      }
    } as Partial<Request> as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as Partial<Response> as Response;
    
  mockedUpdateProfileUserService.mockRejectedValue(new Error('something went wrong'));

  await updateProfileUser(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.send).toHaveBeenCalledWith({
    error: 'an error occurred while updating the profile',
  });
  });
});