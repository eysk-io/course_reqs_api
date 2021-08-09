import { Course } from "../course.model";
import mongoose from "mongoose";

describe("course model", () => {
    describe("schema", () => {
        test("department", () => {
            const department = Course.schema.obj.department
            expect(department).toEqual({
                type: String,
                required: true,
                trim: true,
                maxlength: 5
            })
        })
        test("title", () => {
            const title = Course.schema.obj.title
            expect(title).toEqual({
                type: String,
                required: true,
                trim: true
            });
        });
        test("description", () => {
            const description = Course.schema.obj.description
            expect(description).toEqual({
                type: String,
                required: true,
                trim: true
            });
        });
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
                type: String,
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
        test("equivalencies", () => {
            const equivalencies = Course.schema.obj.equivalencies;
            expect(equivalencies).toEqual({
                type: [mongoose.Mixed],
                required: true
            });
        });
    });
});
