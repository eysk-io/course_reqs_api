import mongoose from "mongoose";

const reviewIndexSchema = new mongoose.Schema(
    {
        reviewSubject: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5
        },
        reviewCode: {
            type: Number,
            required: true,
            trim: true,
            maxlength: 5
        },
        lastUpdatedDay: {
            type: Number,
            required: true,
            trim: true
        },
        lastUpdatedMonth: {
            type: Number,
            required: true,
            trim: true
        },
        lastUpdatedYear: {
            type: Number,
            required: true,
            trim: true
        },
    }
);

reviewIndexSchema.index(
    { reviewSubject: 1, reviewCode: 1 },
    { unique: true }
);

export const ReviewIndex = mongoose.model("reviewIndex", reviewIndexSchema);
