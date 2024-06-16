import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import loseItemServices from './lost-item.service';

const createLoseItem = catchAsync(async (req, res) => {
  const result = await loseItemServices.createLoseItem(
    req.body,
    req?.user?._id,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'lose item submitted successfully!',
    data: result,
  });
});
const getAllLoseItem = catchAsync(async (req, res) => {
  const result = await loseItemServices.getAllLoseItem();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'lose items fetched successfully!',
    data: result,
  });
});
const getMyLoseItems = catchAsync(async (req, res) => {
  const result = await loseItemServices.getMyLoseItems(req?.user?._id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'my lose items fetched successfully!',
    data: result,
  });
});

const deleteLoseItem = catchAsync(async (req, res) => {
  const result = await loseItemServices.deleteLoseItem(req?.params?.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'deleted successfully!',
    data: result,
  });
});

const loseControllers = {
  createLoseItem,
  getAllLoseItem,
  getMyLoseItems,
  deleteLoseItem,
};
export default loseControllers;
