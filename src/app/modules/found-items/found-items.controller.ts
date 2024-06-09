import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import foundItemServices from './found-items.service';

const createFoundItem = catchAsync(async (req, res) => {
  const result = await foundItemServices.createFoundItem(req.body);
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

const foundControllers = {
  createFoundItem,
  createClaim,
  getAllFoundItem,
  getMyFoundItems,
};
export default foundControllers;
