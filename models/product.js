import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    associateAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    associateCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    productName: String,
    productPrice: Number,
    productDescription: String,
    productImage: String,
    productStatus: String, //new, used, 
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

export default mongoose.model('Product', productSchema);