const express = require("express");
const cors = require("cors");
const { userRouter } = require("./Routes/User.Route");
const { productRouter } = require("./Routes/Product.Route");
const { cartRouter } = require("./Routes/Cart.Route");

const connection = require("./Config/db");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

/* For Registration the new use */
app.use("/user", userRouter);

/* For Products  */
app.use("/products", productRouter);

/*For carts */
app.use("/cart", cartRouter);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (err) {
    console.log(`error:${err}`);
  }
  console.log(`server is listening on port ${process.env.PORT}`);
});
