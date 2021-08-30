import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import authController from './controllers/auth.js';
import interestController from './controllers/interests.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res, next) => {
  res.send('hi there');
});

app.post('/', (req, res, next) => {
  // Handle the post for this route
});

app.use(authController);
app.use(interestController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
