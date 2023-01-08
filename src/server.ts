import express, { Application } from 'express';
import cors from 'cors';
import router from './routers';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
dotenv.config();
const PORT = process.env.PORT || 3000;
const HOTNAME: string = '192.168.0.103';
const App: Application = express();
App.use(cors());
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(bodyParser.json());
App.use(express.static('public'));
App.use(router);

App.listen(3000,HOTNAME,() => {
    console.warn(`server runing on port ${PORT}`);
});
