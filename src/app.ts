import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application route
app.use('/api', router)


const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Running 🏃‍♂️🏃‍♂️🏃🏃',
  });
};

app.get('/', getAController);
app.use(globalErrorHandler);

export default app;
