const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const env = require("./.env/env");

const Settings = require('./models/settingsModel');
const User = require("./models/userModel");
const authRoutes = require("./routes/authRoutes")(User, Settings);
const userRoutes = require("./routes/userRoutes")(User, Settings);
const ClockItem = require("./models/clockItemModel");
const clockItemRoutes = require("./routes/clockItemRoutes")(ClockItem);
const Invoice = require("./models/invoiceModel");
const invoiceRoutes = require("./routes/invoiceRoutes")(Invoice, ClockItem);
const Customer = require("./models/customerModel");

const app = express();

mongoose
  .connect(
    "mongodb+srv://proc:" + 
    env.dbpw +
    "@cluster0.pneh5.mongodb.net/" +
    env.dbName +
    "?retryWrites=true&w=majority", 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use("/api/test", (req, res)=>{res.send({'response': {'body': "test successful"}})})
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/clockItem", clockItemRoutes);
app.use("/api/invoice", invoiceRoutes);


module.exports = app;
