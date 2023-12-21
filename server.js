const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require("cors");
const companyRouter = require('./routes/companyRoutes');
const itemRouter = require('./routes/itemRoutes');
const customerRouter = require('./routes/customerRoute');
const purchaseRouter = require('./routes/purchaseRoute');
const saleRouter = require('./routes/saleRoute');
app.use(express.json());
app.use(cors());
require("dotenv").config();

app.use('/', companyRouter)
app.use('/i', itemRouter)
app.use('/c', customerRouter)
app.use('/p', purchaseRouter)
app.use('/s', saleRouter)

mongoose
  .connect("mongodb://127.0.0.1:27017/Inventory")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log("Fail to connect database", error);
  });

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port 4000");
});