const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8080;
const url = "mongodb+srv://admin:admin@cluster0.6jwrl.mongodb.net/hospital-db?retryWrites=true&w=majority"

const startServer = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app.listen(PORT, () => {
      console.log(`Hospital server listening on port ${PORT}!`);
    });
  } catch (err) {console.error(err)}
}

startServer();
