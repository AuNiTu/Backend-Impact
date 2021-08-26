import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import authController from './controllers/auth';
import interestController from './controllers/interests';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());

app.use(authController);
app.use(interestController);

app.use(cookieParser());

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
