import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TUser } from '../user/user.interface';
import User from '../user/user.model';
import { TChangePassword, TLogin } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../config';

import { Response } from 'express';

const createUserIntoDb = async (payload: TUser) => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );
  payload.password = hashedPassword;

  const result = await User.create(payload);

  return result;
};
const login = async (payload: TLogin) => {
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }
  const jwtPayload = {
    _id: user._id.toString(),
    email: user.email,
    username: user?.username,
    role: user.role,
  };
  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  return {
    user,
    token,
  };
};

const changePasswordIntoDb = async (
  res: Response,
  userId: string,
  payload: TChangePassword,
) => {
  const user = await User.findById(userId).select('+password');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.currentPassword,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const newPasswordObject = {
    password: hashedPassword,
  };
  const result = await User.findByIdAndUpdate(userId, {
    $set: { password: hashedPassword },
    $push: { password_history: newPasswordObject },
  });

  return result;
};
const authServices = { createUserIntoDb, login, changePasswordIntoDb };
export default authServices;
