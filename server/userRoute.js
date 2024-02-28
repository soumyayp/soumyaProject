import bodyParser from 'body-parser';
import express from 'express';
import { mongoClient } from './index.js';

const userRouter = express.Router();

userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: false }));

userRouter.post('/newUser', async (req, res) => {
  const data = req.body;
  console.log(data);
  mongoClient.addUser(data);
  res.send({ message: 'Added new User' });
});

userRouter.get('/all', async (req, res) => {
  const data = await mongoClient.getAllUser();
  res.send(data);
});

userRouter.post('/login', async (req, res) => {
  const data = req.body;
  if (!data.username || !data.password) {
    res.status(400).send({ message: 'Bad request' });
    return;
  }
  const userData = await mongoClient.getUser(data.username);
  console.log(data, userData);
  if (!userData) {
    res.status(404).send({ message: 'User doesnt exist' });
    return;
  }
  if (data.password !== userData.password) {
    res.status(403).send({ message: 'Incorrect password' });
    return;
  }
  if (data.password === userData.password) {
    res.status(204).send({ message: 'Successful login' });
    return;
  }
});

export default userRouter;
