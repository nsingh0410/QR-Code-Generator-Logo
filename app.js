const express = require('express');
const app = express();
const port = 3000;
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const generateQRCode = require('./js/generate-qrcode');
const QRCodeEntity = require('./entity/Qrcode.js');
const MeetingHubEntity = require('./entity/Meetinghub.js');
const Utils = require('./js/utils');
const SkyOnAirModel = require('./models/skyonair.js');
const utils = new Utils();
const path = require('path');
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
  apis: ['routes/betfriends.js', 'routes/generate-file.js', 'routes/meetinghub.js'], // Add your API file here
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;