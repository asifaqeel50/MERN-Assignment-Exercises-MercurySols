import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number },
});
const bookModel = mongoose.model("Book", schema);

export default bookModel;