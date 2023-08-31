import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config.js';
import bodyParser from 'body-parser'

import toDoRouter from './routers/toDos.js'
import userRouter from './routers/user.js'

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
    next();
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/',toDoRouter)
  app.use('/auth',userRouter)

  async function start() {
    await mongoose.connect(process.env.DB_STRING);
    console.log('Database connected. :)');
    app.listen(process.env.PORT || 3000);
  }
  
  start();