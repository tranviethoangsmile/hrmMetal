import { Express, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import config from '../configs/config.system';
const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'HRM Metal API',
            version: '1.0.0',
            description: 'API documentation for HRM Metal application',
        },
        servers: [
            {
                url: `http://localhost:${config.app.port}`, // Update this to match your server URL
            },
        ],
    },
    apis: [
        path.join(__dirname, '../routers/*.ts'),
        path.join(__dirname, './swaggerAPI/**/*.swagger.ts'),
    ], // Adjust the path to your router files
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: Express, port: number) {
    // Serve Swagger UI at /api-docs
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

    // Serve raw Swagger JSON at /docs.json
    app.get('/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.info(
        `API Docs available at http://localhost:${config.app.port}/api-docs`,
    );
}

export default swaggerDocs;
