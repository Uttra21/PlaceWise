const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/chat"));

app.listen(process.env.PORT, () => {
    console.log(`PlaceWise running on port ${process.env.PORT}`);
});