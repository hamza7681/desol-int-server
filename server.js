require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./connections/config");
const port = process.env.PORT;
const morgan = require("morgan");

connection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      "-",
      tokens.url(req, res),
      "-",
      tokens.status(req, res),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

app.use("/api", require("./routes/car.routes"));

app.listen(port, () => {
  console.log("Server is running on port", port);
});
