import express, { Request, Response } from 'express';
import connetcDatabase from './database/db'
const app = express();
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Hello World!' });
});

import { setupSwagger } from './swagger';
setupSwagger(app);

import userRouter from '../src/routes/users-routes'
app.use('/user', userRouter)

connetcDatabase();
app.listen(3000, () => {
  console.log('server running OK !');
});