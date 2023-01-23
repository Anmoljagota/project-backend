const mongoose = require("mongoose");
const allDetailSchema = mongoose.Schema({
userdetails:Array,
catrdetails:Array  

});
const AllDetailModel = mongoose.model("allDetailSchema", cartSchema);
module.exports = {
    AllDetailModel,
};

