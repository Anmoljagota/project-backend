const mongoose = require("mongoose");
const registerSchema = mongoose.Schema(
  {
    PhoneNumber: { type: Number, required: true, min: 4, unique: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const UserModel = mongoose.model("Users", registerSchema);
module.exports = {
  UserModel,
};
