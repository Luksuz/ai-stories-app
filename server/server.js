const express = require("express");
const app = express();
const env = require("dotenv").config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
connectDB();
const cors = require('cors');
//add all origins
app.use(cors( {origin: '*'}));
const port = process.env.PORT || 5001;


const options = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'Your API Documentation',
          version: '1.0.0',
          description: 'Documentation for your API',
      },
  },
  apis: ['./routes/storyRoutes.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.use(express.json());
app.use("/api/stories", require("./routes/storyRoutes"));
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
