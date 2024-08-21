import { loginUserService, registerUserService  } from '../../src/service/users-services';
import { User } from '../../src/models/users-models';
import bcrypt from 'bcrypt';

jest.mock('../../src/models/users-models');
jest.mock('bcrypt');

const mockedUserFindOne = User.findOne as jest.Mock;
const mockedUserCreate = User.create as jest.Mock;
const mockedBcryptCompareSync = bcrypt.compareSync as jest.Mock;
const defaultAvatar = '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'

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
  
afterEach(() => {
  jest.restoreAllMocks();
});

describe('loginUserService', () => {
  it('should return a failed status when the user is not found', async () => {
    mockedUserFindOne.mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce(null)
    }));

    const response = await loginUserService('notfound@examble.com', 'password123')
    const user = { _id: '', userName: '', userEmail: '', userPassword: '', userAge: 0, userCity: '', userAvatar: '' };

    expect(mockedUserFindOne).toHaveBeenCalledWith({ userEmail: 'notfound@examble.com' });
    expect(response).toEqual({
        user,
        message: 'user not fould',
        OK: false,
    })
  });

  it('should return a failed status when the password is incorrect', async () => {
    mockedUserFindOne.mockReturnValue({
        select: jest.fn().mockResolvedValueOnce({
            _id: '123',
            userName: 'testuser',
            userEmail: 'testing@examble.com',
            userPassword: 'hashedpassword',
            userAge: 30,
            userCity: 'TestCity',
            userAvatar: 'dqdqdq24'
          }),
    });

    mockedBcryptCompareSync.mockReturnValueOnce(false);
    const response = await loginUserService('notfound@examble.com', 'wrongpassword');
    const user = { _id: '', userName: '', userEmail: '', userPassword: '', userAge: 0, userCity: '', userAvatar: '' };
    
    expect(mockedBcryptCompareSync).toHaveBeenCalledWith('wrongpassword', 'hashedpassword');
    expect(response).toEqual({
        user,
        message: 'incorrect username or password',
        OK: false
    });
  });

  it('should return user data and success message when login is successful', async () => {
      mockedUserFindOne.mockReturnValue({
        select: jest.fn().mockResolvedValueOnce({
          _id: '123',
          userName: 'testuser',
          userEmail: 'testing@examble.com',
          userPassword: 'hashedpassword',
          userAge: 30,
          userCity: 'TestCity',
          userAvatar: 'dqdqdq24'
        }),     
    });
    mockedBcryptCompareSync.mockReturnValueOnce(true);

    const response = await loginUserService('notfound@examble.com', 'correctpassword')
    
    expect(response).toEqual({
      user: {
        _id: '123',
        userName: 'testuser',
        userEmail: 'testing@examble.com',
        userPassword: 'hashedpassword',
        userAge: 30,
        userCity: 'TestCity',
        userAvatar: 'dqdqdq24'
      },
      message: 'LOGIN OK',
      OK: true,
    });
  });

  it('should return undefined when an error occurs', async () => {
    mockedUserFindOne.mockImplementationOnce(() => {
      throw new Error('Database error');    
    });

    const response = await loginUserService('error@examble.com', 'password123');

    expect(response).toBeUndefined();
  });

});

describe('registerUserService', () => {
  it('should successfully register a user', async () => {
    const mockUser = {
      _id: '123',
      userName: 'testuser',
      userEmail: 'test@examble.com',
      userPassword: 'hashedpassword',
      userAge: 25,
      userCity: 'TestCity',
      userAvatar: defaultAvatar
    }

    mockedUserCreate.mockResolvedValueOnce(mockUser);

    const body = {
      userName: 'testuser',
      userEmail: 'test@examble.com',
      userPassword: 'password123',
      userAge: 25,
      userCity: 'TestCity',
    }

    const response = await registerUserService(body);

    expect(mockedUserCreate).toHaveBeenCalledWith({
        ...body,
        userAvatar: defaultAvatar
    });
    expect(response).toEqual({
      user: mockUser,
      message: 'CADASTRO OK',
      OK: true,
    });
  });

  it('should return a failed status when the user cannot be created', async () => {
    mockedUserCreate.mockResolvedValueOnce(null);

    const body = {
      userName: 'testuser',
      userEmail: 'test@examble.com',
      userPassword: 'password123',
      userAge: 25,
      userCity: 'TestCity',
    };

    const response = await registerUserService(body);
    const user = { _id: '', userName: '', userEmail: '', userPassword: '', userAge: 0, userCity: '', userAvatar: '' };

    expect(mockedUserCreate).toHaveBeenCalledWith({
      ...body,
      userAvatar: defaultAvatar
    });
    expect(response).toEqual({
      user,
      message: 'could not create user',
      OK: false
    });
  }); 

  it('should handle errors gracefully', async () => {
    const error = new Error('database error');
    mockedUserCreate.mockRejectedValueOnce(error);

    const body = {
      userName: 'testuser',
      userEmail: 'test@examble.com',
      userPassword: 'password123',
      userAge: 25,
      userCity: 'TestCity',
    };

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const response = await registerUserService(body);

    expect(consoleSpy).toHaveBeenCalledWith('houve um erro na execução do SERVICE de CADASTRO: ', error);
    expect(response).toBeUndefined();
  });
});