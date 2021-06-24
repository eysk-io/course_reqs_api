import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
            unique: true
        }
    }
)

export const School = mongoose.model('school', schoolSchema);