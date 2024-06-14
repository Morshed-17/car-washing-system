import { TErrorMessages, TErrorResponse } from '../interface/error';
import mongoose from 'mongoose';

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): TErrorResponse => {
  const errorMessages: TErrorMessages = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el.path,
        message: el.message,
      };
    },
  );

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages,
  };
};

export default handleValidationError;
