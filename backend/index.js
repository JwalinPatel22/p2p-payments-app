const express = require("express");
const connectDB = require("./db.js");
const rootRouter = require("./routes/index_routes");
const morgan = require("morgan");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();

//connecting database
connectDB();

app.use(cors()); //cors for every origin
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//root route for testing
app.get("/", function (req, res) {
  res.send("server working bois");
});

app.use("/paytm/v1", rootRouter);

app.listen(3001, () => {
  console.log("server running on port 3001");
});
