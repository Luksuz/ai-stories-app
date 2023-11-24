const express = require("express");
const app = express();
const env = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
connectDB();
const cors = require('cors');
//add all origins
app.use(cors( {origin: '*'}));
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/stories", require("./routes/storyRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
