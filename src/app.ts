import express, { Application } from 'express';
import notFoundRoutes from './app/middleware/notFound.middleware';
import globalErrorHandler from './app/middleware/globalError.middleware';
import router from './app/routes';
export const app: Application = express();

app.use(express.json());

app.use('/api', router);

app.use(notFoundRoutes);

app.use(globalErrorHandler);
