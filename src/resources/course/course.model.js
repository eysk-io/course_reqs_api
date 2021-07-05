import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        department: {
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
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
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
        // for both pre- and co-requisites, can have the following structures:
        // [String] -> i.e. ["CPSC 310", "CPSC 221", ...]
        // [{ oneOf: [String] }] -> i.e. [ {oneOf: ["CPSC 310", "CPSC 221"] }, ...]
        // [{ scoreOf: Number, metric: String, courses: [String] }] -> i.e. { scoreOf: 64, metric: "percentage", courses: [ "PHYS 157" ] }
        // { advancedCredit: [String] } -> i.e. { advancedCredit: ["MATH 103"] }
        // and any nested combination of these
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
