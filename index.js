const express = require("express");
const { connection } = require("./configs/db");
const cors = require("cors");
const {router} = require("./Route/payment")
// Route
const { AuthRouter } = require("./Route/Auth_Route");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", AuthRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json({ extended: false }));
app.use("/payment", router);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`listening on http://localhost:${process.env.PORT}`);
  } catch (err) {
    console.log("trouble connecting to the db");
    console.log(err);
  }
});
