import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Want Tatoo API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
            url: 'http://localhost:3000' //server-local
      },
     ],
    },
    apis: ['./src/routes/*.ts']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}