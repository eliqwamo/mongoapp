import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    categoryName: String,
    createdAt: {type: Date, default: Date.now},
    isPublished: {type: Boolean, default: false}
})

export default mongoose.model('Category', categorySchema);