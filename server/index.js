require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require('body-parser')
const app = express();
const server = http.Server(app);
const dbConnection = require("./database/connection/mongoConnection");
const productRouts = require("./routes/products")
const userRouts = require("./routes/users")
const cors = require("cors");
const validateToken = require("./validations/validateToken")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
dbConnection();

app.use("/users", userRouts)
app.use(validateToken)
app.use("/products", productRouts)

server.listen(process.env.PORT, () => {
    console.log(`listening to ${process.env.PORT}`);
});