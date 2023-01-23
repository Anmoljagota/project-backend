const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  
 userId:{
  type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
 },


  quantity: {
    type: Number,
    min: 1,
  },
});
const CartrModel = mongoose.model("Card", cartSchema);
module.exports = {
  CartrModel,
};
