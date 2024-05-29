import mongoose from "mongoose";
const register = mongoose.Schema({
  employee_id: {
    type: String,
    // required: true,
  },
  username: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    unique:true
    // required: true,
  },
  mobile: {
    type: Number,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  is_admin: {
    type: Number,
    required: true,
    default: 0,
  },
  is_verified: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
    default: "",
  },
});

export default mongoose.model("Registeration", register);