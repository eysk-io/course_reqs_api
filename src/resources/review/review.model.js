import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        courseId: {
            type: String,
            trim: true
        },
        review: {
            type: String,
            trim: true
        }
    },
    {
        collection: "review"
    }
);

export const Review = mongoose.model("review", reviewSchema);
