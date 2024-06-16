import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import foundItemServices from './found-items.service';

const createFoundItem = catchAsync(async (req, res) => {
  const result = await foundItemServices.createFoundItem(
    req.body,
    req?.user?._id,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'found item submitted successfully!',
    data: result,
  });
});
const createClaim = catchAsync(async (req, res) => {
  const result = await foundItemServices.createClaim({
    ...req.body,
    userId: req?.user?._id,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'claim  submitted successfully!',
    data: result,
  });
});
const getMyClaims = catchAsync(async (req, res) => {
  const result = await foundItemServices.getMyClaims(req?.user?._id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'claim fetched successfully!',
    data: result,
  });
});
const getAllFoundItem = catchAsync(async (req, res) => {
  const result = await foundItemServices.getAllFoundItem();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'found items fetched successfully!',
    data: result,
  });
});
const getMyFoundItems = catchAsync(async (req, res) => {
  const result = await foundItemServices.getMyFoundItems(req?.user?._id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'my found items fetched successfully!',
    data: result,
  });
});
const updateStatus = catchAsync(async (req, res) => {
  const result = await foundItemServices.updateStatus(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'status updated successfully!',
    data: result,
  });
});
const deleteFoundItem = catchAsync(async (req, res) => {
  const result = await foundItemServices.deleteFoundItem(req?.params?.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'deleted successfully!',
    data: result,
  });
});

const foundControllers = {
  createFoundItem,
  createClaim,
  getMyClaims,
  getAllFoundItem,
  getMyFoundItems,

  updateStatus,
  deleteFoundItem,
};
export default foundControllers;
