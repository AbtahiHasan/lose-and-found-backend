/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFoundRoutes = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    errorMessage: '',
    errorDetails: {},
    stack: null,
  });
};

export default notFoundRoutes;
