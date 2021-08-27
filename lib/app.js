import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import authController from './controllers/auth.js';
import interestController from './controllers/interests.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
  // origin: "*",
  credentials: true
}));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:7891/"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('hi there');
});

app.post('/', (req, res, next) => {
  // Handle the post for this route
});

app.use(authController);
app.use(interestController);

app.use(cookieParser());

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
