import express from 'express';
import router from './app/routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

// parsers

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', router);

export default app;
