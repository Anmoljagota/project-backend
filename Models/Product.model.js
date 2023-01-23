const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: String,
  category: String,
  images: String,
  returnable: Boolean,
  cancellable: Boolean,
  popular: Number,
  return_window: Number,
  description: String,
  price: Number,
  discount:String
},
  {
    versionKey: false,
    timestamps: true,
  }
);
const ProductModel = mongoose.model("products", productSchema);
module.exports = {
  ProductModel,
};
