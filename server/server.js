require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const friendRouter = require("./routes/friendRoutes");

mongoose
  .connect(process.env.URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/friends", friendRouter);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));