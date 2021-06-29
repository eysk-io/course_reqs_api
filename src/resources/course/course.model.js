import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5
        },
        number: {
            type: Number,
            required: true,
            trim: true,
            maxlength: 5
        },
        school: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "school",
            required: true
        },
        credits: {
            type: Number,
            required: true,
            trim: true,
            maxlength: 2
        },
        // for both pre- and co-requisites, can have either of the following structures:
        // [String] -> i.e. ["CPSC 310", "CPSC 221", ...]
        // [{"oneOf": [String]}] -> i.e. [{oneOf: ["CPSC 310", "CPSC 221"]}, ...]
        preRequisites: {
            type: [mongoose.Mixed],
            required: true
        },
        coRequisites: {
            type: [mongoose.Mixed],
            required: true
        },
    }
);

courseSchema.index(
    { school: 1, name: 1, number: 1 },
    { unique: true }
);

export const Course = mongoose.model("course", courseSchema);
