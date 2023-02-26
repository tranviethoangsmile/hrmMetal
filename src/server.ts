import express, { Application, application } from 'express';
import cors from 'cors';
import router from './routers';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io'
dotenv.config();
// import swaggerDocs from './swagger/swagger';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
const options: swaggerJSDoc.Options =  {
    definition: {
        openapi: "3.0.0",
        info: {
                        title: "lib APT",
                        version: "1.0.0",
                        description: "express api for Metal"
                    },
                    servers: [
                        {
                            url: "http://localhost:3030"
                        }
                    ]
    },
    apis: [`${path.join(__dirname, '/server.ts')}`]
}

const specs = swaggerJSDoc(options);
const PORT = process.env.PORT || 3000;
const HOTNAME: string = '192.168.0.103';
const App = express();
const server = http.createServer(App);

App.use(cors());
App.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(bodyParser.json());
App.use(express.static('public'));
App.use(router);
const io = new Server (server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'DELETE',],
      },
})
io.on('connection', (socket) => {
    console.log('connection')
})

App.listen(3030,() => {
    console.warn(`server runing on port ${PORT}`);
    // swaggerDocs(App, 3030 )
});
