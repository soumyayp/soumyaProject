import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';

import { MongoClientConnection } from './mongoClient.js';
import userRouter from './userRoute.js';

// const router = express.Router();
const app = express();
app.use(cors());

app.use('/user', userRouter);
// app.use('/models', modelRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoClient = new MongoClientConnection();

export { mongoClient };

const PORT = process.env.PORT || 3030;

// client request origin URL which are allowed to interact with the api
const CLIENT_ORIGIN = [''];
const DEV_CLIENT_ORIGIN = 'http://localhost:3000';

const CORS = {
  origin: ['*'],
  methods: ['GET', 'POST'],
};

const server = http.createServer(app, {
  cors: CORS,
});

app.get('/', (req, res) => {
  res.send('You are at the home page ');
});

server.listen(PORT, () => {
  console.log(`server listening ar port ${PORT}`);
});
