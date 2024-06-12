import express from 'express';
import router from './app/routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import NotFound from './app/errors/NotFound';
import auth from './app/middlewares/auth';
import { BookingControllers } from './app/modules/booking/booking.controller';
const app = express();

// parsers

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', router);

app.get('/api/my-bookings', auth('user'), BookingControllers.getUserBooking);

app.use(globalErrorHandler);

app.all('*', NotFound);

export default app;
