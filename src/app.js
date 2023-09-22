const express = require('express');
const app = express();
const port = 3000;
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const generatefileRouter = require('./routes/generate-file');

app.use(express.json());

// Endpoints
app.use('/', generatefileRouter);

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'QR Code Generator API',
      version: '1.0.0',
      description: 'Generate QR codes with logos.',
    },
    servers: [ 
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      }
    ],
  },
  apis: [
  'src/routes/generate-file.js'
],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;