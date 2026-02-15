import mongoose, { Schema } from "mongoose";

const Review = new Schema({
    name: {type: String, required: true},
    message: {type: String, required: true}
},
{timestamps:true})


export const ReviewSchema = mongoose.models.Review || mongoose.model("Review", Review)