import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import authController from './controllers/auth.js';
import interestController from './controllers/interests.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hi there');
});

app.use(authController);
app.use(interestController);

app.use(cookieParser());

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
