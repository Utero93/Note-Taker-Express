const express = require("express");
const PORT = process.env.PORT || 80;
const app = express();

// middleware for json data
app.use(express.json());
// middleware for url encoded data utf-8
app.use(express.urlencoded({ extended: true }));
// middleware for serving static files from the public folder
app.use(express.static("public"));

const apiRouter = require("./routes/apiRoutes");
const htmlRouter = require("./routes/htmlRoutes");

// apiRouter paths will always start with '/api'
app.use("/api", apiRouter);
// hmltRouter routes will start with '/'
app.use("/", htmlRouter);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);