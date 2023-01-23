const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { ProductModel } = require("../Models/Product.model");
const { log } = require("console");
const productRouter = express.Router();
/* For Regisration */
productRouter.post("/", async (req, res) => {
  try {
    const create = new ProductModel(req.body);
    await create.save();
    res.send("Product Created");
  } catch (err) {
    res.send(`error:${err}`);
    console.log("product created");
  }
});
/* For Getting the   product */
productRouter.get("/", async (req, res) => {
  if (req.query.price === "price_low_to_high") {
    let price_Low_How = await ProductModel.find().sort({ price: 1 });
    res.send(price_Low_How);
  } else if (req.query.price === "price_high_to_low") {
    let price_high_low = await ProductModel.find().sort({ price: -1 });
    res.send(price_high_low);
  } else if (req.query.popularBy === "popular") {
    const { popularBy } = req.query;
    try {
      let populatby = await ProductModel.find({ popular: 70 % off });
      res.send(populatby);
    } catch (err) {
      res.send(err);
    }
  } else if (req.query.page) {
    const { page, limit } = req.query;
    if (!page) {
      page = 1;
    }
    const newlimit = Number(limit);
    let size = (page - 1) * limit;
    let paginated = await ProductModel.find({}).limit(newlimit).skip(size);
    res.send(paginated);
  } else {
    try {
      const data = await ProductModel.find();
      res.send(data);
    } catch (err) {
      res.send(`error:${err}`);
    }
  }
});
/*Filter Api */

productRouter.get("/filter", async (req, res) => {
  try {
    if (req.query.price === "1000-2000") {
      let filter = await ProductModel.find({
        $and: [{ price: { $gt: 1000 } }, { price: { $lt: 2000 } }],
      });
      res.send(filter);
    } else if (req.query.price === "2000-5000") {
      let filter = await ProductModel.find({
        $and: [{ price: { $gt: 2000 } }, { price: { $lt: 5000 } }],
      });
      res.send(filter);
    } else if (req.query.price === "500-1000") {
      let filter = await ProductModel.find({
        $and: [{ price: { $gt: 500 } }, { price: { $lt: 1000 } }],
      });
      res.send(filter);
    } else if (req.query.price === "Above 500") {
      let filter = await ProductModel.find({ price: { $gt: 500 } });
      res.send(filter);
    }
  } catch (err) {
    res.send(`error:${err}`);
  }
});
/* For Getting the Search  product */
productRouter.get("/search", async (req, res) => {
  if (req.query.name != undefined) {
    try {
      let searchdata = await ProductModel.find({
        name: { $regex: `${req.query.name}`, $options: "i" },
      });
      res.send(searchdata);
    } catch (err) {
      res.send(`error:${err}`);
    }
  } else {
    try {
      const data = await ProductModel.find();
      res.send(data);
    } catch (err) {
      res.send(`error:${err}`);
    }
  }
});
productRouter.delete("/:id", async (req, res) => {
  const ID = req.params.id;

  try {
    await ProductModel.findByIdAndDelete({ _id: ID });
    res.send("Product deleted");
  } catch (err) {
    res.send(`error:${err}`);
  }
});
productRouter.patch("/:id", async (req, res) => {
  const ID = req.params.id;

  try {
    await ProductModel.findByIdAndUpdate({ _id: ID }, req.body);
    res.send("Product Updated");
  } catch (err) {
    res.send(`error:${err}`);
  }
});
module.exports = {
  productRouter,
};
