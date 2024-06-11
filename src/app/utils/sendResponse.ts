import { Response } from 'express';

type TResponseData<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};

const sendResponse = <T>(res: Response, ResponseData: TResponseData<T>) => {
  res.status(ResponseData.statusCode).json({
    success: ResponseData.success,
    statusCode: ResponseData.statusCode,
    message: ResponseData.message,
    data: ResponseData.data,
  });
};

export default sendResponse;
