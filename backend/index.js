const express = require("express"),
  path = require("path");
const cors = require("cors");
const app = express();
port = process.env.PORT || 3000;

app.use(cors());

app.get("/api", (req, res) => {
  res.send({ connect: "Succesfully pulling from the backend!" });
});

app.use(express.static(path.join(path.resolve(), "dist")));

app.listen(port, () => {
  console.log(`Connected to http://localhost:${port}/`);
});
