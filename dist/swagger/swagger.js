"use strict";
// import { Express, Request, Response } from 'express';
// import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUI from 'swagger-ui-express';
// import path from 'path';
// const options: swaggerJSDoc.Options = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'lib APT',
//             version: '1.0.0',
//             description: 'express api for Metal',
//         },
//         servers: [
//             {
//                 url: 'http://localhost:3030',
//             },
//         ],
//     },
//     apis: [`${(path.join(__dirname), './routers/*.ts')}`],
// };
// const swaggerSpec = swaggerJSDoc(options);
// function swaggerDocs(app: Express, port: number) {
//     app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
//     app.get('docs.json', (req: Request, res: Response) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.send(swaggerSpec);
//     });
//     console.info(`API Docs available at http://localhost:${port}/api-docs`);
// }
// export default swaggerDocs;
