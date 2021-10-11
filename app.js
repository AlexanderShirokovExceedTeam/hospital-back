const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 8080;
const visitApiRoutes = require("./src/modules/routes/visitRoutes");
const userApiRoutes = require("./src/modules/routes/userRoutes");
const url = "mongodb+srv://admin:admin@cluster0.6jwrl.mongodb.net/hospital-db?retryWrites=true&w=majority"

const startServer = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });    

    app.use(cors());
    app.use(express.json());
    app.use("/", visitApiRoutes);
    app.use("/", userApiRoutes);

    app.listen(PORT, () => {
      console.log(`Hospital server listening on port ${PORT}!`);
    });
  } catch (err) {console.error(err)}
}

startServer();
