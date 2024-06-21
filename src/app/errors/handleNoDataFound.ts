import { Response } from 'express';
import httpStatus from 'http-status';

export const handleNoDataFound = (res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: 'No Data Found',
    data: [],
  });
};
