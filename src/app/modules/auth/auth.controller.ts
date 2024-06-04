import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import authServices from './auth.service';

const createUser = catchAsync(async (req, res) => {
  const result = await authServices.createUserIntoDb(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});
const login = catchAsync(async (req, res) => {
  const result = await authServices.login(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User login successful',
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const result = await authServices.changePasswordIntoDb(
    req?.user?._id,
    req?.body,
  );

  if (result) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Password changed successfully',
      data: result,
    });
  }
});
const updateProfile = catchAsync(async (req, res) => {
  const result = await authServices.updateProfile(req?.user?._id, req?.body);

  if (result) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'profile updated successfully',
      data: result,
    });
  }
});
const updateToken = catchAsync(async (req, res) => {
  const result = await authServices.updateToken(req?.user?._id);

  if (result) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'token updated successfully',
      data: { token: result },
    });
  }
});
const authControllers = {
  createUser,
  login,
  changePassword,
  updateProfile,
  updateToken,
};
export default authControllers;
