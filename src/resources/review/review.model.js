import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        courseId: {
            type: String,
            required: true,
            trim: true
        },
        review: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        collection: "review"
    }
);

export const Review = mongoose.model("review", reviewSchema);
