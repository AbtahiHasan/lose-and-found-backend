import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TPasswordHistory, TUser } from '../user/user.interface';
import User from '../user/user.model';
import { TChangePassword, TLogin } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../config';
import sendResponse from '../../utils/sendResponse';
import { Response } from 'express';
import moment from 'moment';

const createUserIntoDb = async (payload: TUser) => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );
  payload.password = hashedPassword;
  payload.password_history = [{ password: hashedPassword }];

  const result = await User.create(payload);

  return result;
};
const login = async (payload: TLogin) => {
  const user = await User.findOne({ username: payload.username }).select(
    '+password',
  );
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
  const lastTwoPasswords = user.password_history.slice(-2);

  const isPasswordRepeated = lastTwoPasswords.some((history) => {
    return bcrypt.compareSync(payload?.newPassword, history.password);
  });

  if (isPasswordRepeated) {
    const lastUsedDate: any = lastTwoPasswords.find((history) => {
      return bcrypt.compareSync(payload?.newPassword, history.password);
    });

    const formattedLastUsedDate = lastUsedDate
      ? moment(lastUsedDate.createdAt).format('YYYY-MM-DD [at] hh:mm A')
      : '';
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${formattedLastUsedDate}).`,
      data: null,
    });
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
