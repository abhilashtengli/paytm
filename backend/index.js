const express = require("express");
const connectDB = require("./src/config/database");
const app = express();
const userRouter = require("./src/routes/userRouter");
const accountRouter = require("./src/routes/accountRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:5173", //You need to whitelist the domain to avoid Cors
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/", userRouter);
app.use("/api/v1/", accountRouter);

connectDB()
  .then(() => {
    console.log("Database connection established");

    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection not established ");
  });
