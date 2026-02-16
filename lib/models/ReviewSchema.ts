import mongoose, { Schema } from "mongoose";

const Review = new Schema({
    name: {
        en: {type: String, required: true},
        ar: {type: String, required: true},
    },
    message: {
        en: {type: String, required: true},
        ar: {type: String, required: true}
    }
},
{timestamps:true})


export const ReviewSchema = mongoose.models.Review || mongoose.model("Review", Review)