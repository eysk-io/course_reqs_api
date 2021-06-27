import { Course } from "../course.model";
import mongoose from "mongoose";

describe("course model", () => {
    describe("schema", () => {
        test("name", () => {
            const name = Course.schema.obj.name
            expect(name).toEqual({
                type: String,
                required: true,
                trim: true,
                maxlength: 5
            })
        })
        test("number", () => {
            const number = Course.schema.obj.number
            expect(number).toEqual({
                type: Number,
                required: true,
                trim: true,
                maxlength: 5
            })
        })
        test("credits", () => {
            const credits = Course.schema.obj.credits
            expect(credits).toEqual({
                type: Number,
                required: true,
                trim: true,
                maxlength: 2
            })
        })
        test("school", () => {
            const school = Course.schema.obj.school;
            expect(school).toEqual({
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'school',
                required: true
            });
        });
        test("pre-requisites", () => {
            const preRequisites = Course.schema.obj.preRequisites;
            expect(preRequisites).toEqual({
                type: [mongoose.Mixed],
                required: true
            });
        });
        test("co-requisites", () => {
            const coRequisites = Course.schema.obj.coRequisites;
            expect(coRequisites).toEqual({
                type: [mongoose.Mixed],
                required: true
            });
        });
    });
});
