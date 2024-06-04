import express, { Application } from 'express';
import notFoundRoutes from './app/middleware/notFound.middleware';
import globalErrorHandler from './app/middleware/globalError.middleware';
import router from './app/routes';
import cors from 'cors';
export const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
  }),
);

app.use('/api/v1', router);

app.use(notFoundRoutes);

app.use(globalErrorHandler);
