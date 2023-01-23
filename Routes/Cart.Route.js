const express = require("express");
const { CartrModel } = require("../Models/Cart.Model");
const { ProductTocart } = require("../Middlewares/ProducToCart");
const jwt = require("jsonwebtoken");
const cartRouter = express.Router();
/* For cart creation */
// cartRouter.post("/", async (req, res) => {

//   try {
//     const create = new CartrModel(req.body);
//     await create.save();
//     res.send("cart Created");
//   } catch (err) {
//     res.send(`error:${err}`);
//   }
// });

/* For Cart post */
cartRouter.post("/", ProductTocart, async (req, res) => {
  const { product, quantity, userId } = req.body;
  console.log(req.body, "kkkk");
  console.log("i am product", product);
  let findproduct = await CartrModel.find({ product });
  console.log(findproduct);
  // if (req.body.name || req.body.email) {
  //   add = new CartrModel(req.body.name, req.body.email);
  //   let person = CartrModel.userdetails.push(add);
  //   person.save();
  //   res.send("added");
  // }
  try {
    const { quantity } = req.body;
    console.log(quantity);
    if (findproduct.length > 0) {
      res.send(findproduct);
    } else {
      const cart = new CartrModel({ userId, product });
      console.log("i am cart", cart);
      await cart.save();
      res.send(cart);
    }
  } catch (err) {
    res.send(`error:${err}`);
  }
});
cartRouter.get("/", async (req, res) => {
  try {
    const cart = await CartrModel.find().populate(["product", "userId"]);

    res.send(cart);
  } catch (err) {
    res.send(`error:${err}`);
  }
});
module.exports = {
  cartRouter,
};
