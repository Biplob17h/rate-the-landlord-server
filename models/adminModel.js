import mongoose, { mongo } from "mongoose";

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin
