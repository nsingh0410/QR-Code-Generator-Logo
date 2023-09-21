const express = require('express');
const app = express();
const port = 3000;
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const meetinghubRouter = require('./routes/meetinghub');
const betfriendsRouter = require('./routes/betfriends');
const generatefileRouter = require('./routes/generate-file');

app.use(express.json());

// Endpoints
app.use('/', meetinghubRouter);
app.use('/', betfriendsRouter);
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
        url: 'https://internal-digiapi.skyracing.cloud',
        description: 'Prod development server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      }
    ],
  },
  apis: [
  'src/routes/betfriends.js', 
  'src/routes/generate-file.js', 
  'src/routes/meetinghub.js'
],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;