import express from 'express';
import 'express-async-errors';
import handleError from './middleware/handleError';

import CarRouter from './routes/carRouter';

const app = express();

app.use(express.json());
app.use('/cars', CarRouter);
app.use(handleError);

export default app;