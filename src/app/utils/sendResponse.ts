import { Response } from 'express';

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const meta = data?.meta;
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data?.data,
    meta,
  });
};

export default sendResponse;
