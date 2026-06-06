"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const config_system_1 = __importDefault(require("../configs/config/config.system"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'HRM Metal API',
            version: '1.0.0',
            description: 'API documentation for HRM Metal application',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        servers: [
            {
                url: `http://localhost:${config_system_1.default.app.port}`,
            },
        ],
    },
    apis: [
        path_1.default.join(__dirname, '../routers/*.ts'),
        path_1.default.join(__dirname, './swaggerAPI/**/*.swagger.ts'),
    ],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function swaggerDocs(app, port) {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.info(`API Docs available at http://localhost:${config_system_1.default.app.port}/api-docs`);
}
exports.default = swaggerDocs;
