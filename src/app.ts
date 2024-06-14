import express from 'express';
import router from './app/routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import NotFound from './app/errors/NotFound';
const app = express();

// parsers

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({
    message: 'Wellcome to Car Wash Backend',
  });
});

app.use('/api', router);

app.use(globalErrorHandler);

app.all('*', NotFound);

export default app;
