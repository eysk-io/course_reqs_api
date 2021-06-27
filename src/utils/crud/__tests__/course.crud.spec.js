import {
    getAllCoursesBySchool,
    createCourse,
    getAllCoursesByName,
    removeCoursesByName,
    getCourse,
    updateCourse,
    removeCourse
} from "../course.crud";
import { Course } from "../../../resources/course/course.model";
import { School } from "../../../resources/school/school.model";
import mongoose from "mongoose";

describe("course crud functions", async () => {
    describe("createCourse", async () => {
        test("create one simple course", async () => {
            const schoolModel = await School.create({ name: "UBC" });
            const req = {
                params: {
                    school: schoolModel.name
                },
                body: {
                    name: "CPSC",
                    number: 110,
                    credits: 4,
                    preRequisites: [],
                    coRequisites: []
                }
            };
            const expectedCourse = {
                name: "CPSC",
                number: 110,
                credits: 4,
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            };
            const res = {
                status(status) {
                    expect(status).toBe(201);
                    return this;
                },
                json(result) {
                    expect(result.data.name.toString()).toEqual(expectedCourse.name.toString());
                    expect(result.data.number).toEqual(expectedCourse.number);
                    expect(result.data.credits).toEqual(expectedCourse.credits);
                    expect(result.data.preRequisites).toHaveLength(0);
                    expect(result.data.coRequisites).toHaveLength(0);
                }
            }
            await createCourse(Course, School)(req, res);
            expect.assertions(6);
        });
        test("400 for school that doesn't exist", async () => {
            const req = {
                params: {
                    school: "UBC"
                },
                body: {
                    name: "CPSC",
                    number: 110,
                    credits: 4,
                    preRequisites: [],
                    coRequisites: []
                }
            };
            const res = {
                status(status) {
                    expect(status).toBe(404);
                    return this;
                },
                end() {
                    expect(true).toBe(true);
                }
            }
            await createCourse(Course, School)(req, res);
            expect.assertions(2);
        });
    });
    describe("getAllCoursesBySchool", async () => {
        test("find all courses by school with no pre- or co-reqs", async () => {
            const school = await School.create({ name: "UBC" });
            const course = await Course.create({
                name: "CPSC",
                number: 110,
                school: school._id,
                credits: 4,
                preRequisites: [],
                coRequisites: []
            });
            const req = {
                params: {
                    school: school.name
                }
            };
            const res = {
                status(status) {
                    expect(status).toBe(200);
                    return this;
                },
                json(result) {
                    expect(result.data[0]._id.toString()).toBe(course._id.toString());
                }
            }
            await getAllCoursesBySchool(Course, School)(req, res);
            expect.assertions(2);
        });
        test("404 if school not found", async () => {
            await Course.create({
                name: "CPSC",
                number: 110,
                credits: 4,
                school: mongoose.Types.ObjectId(),
                preRequisites: [],
                coRequisites: []
            });
            const req = {
                params: "UBC"
            };
            const res = {
                status(status) {
                    expect(status).toBe(404);
                    return this;
                },
                end() {
                    expect(true).toBe(true);
                }
            }
            await getAllCoursesBySchool(Course, School)(req, res);
            expect.assertions(2);
        });
        test("return empty list of courses if no courses available for school", async () => {
            const school = await School.create({ name: "UBC" });
            const req = {
                params: {
                    school: school.name
                }
            };
            const res = {
                status(status) {
                    expect(status).toBe(200);
                    return this;
                },
                json(result) {
                    expect(result.data).toEqual([]);
                }
            }
            await getAllCoursesBySchool(Course, School)(req, res);
            expect.assertions(2);
        });
    });
    describe("getCourse", async () => {
        test("find all courses by school with one unnested pre-req", async () => {
            const school = await School.create({ name: "UBC" });
            const cpsc107 = await Course.create({
                name: "CPSC",
                number: 107,
                school: school._id,
                credits: 3,
                preRequisites: ["CPSC 103"],
                coRequisites: []
            });
            const cpsc103 = await Course.create({
                name: "CPSC",
                number: 103,
                school: school._id,
                credits: 3,
                preRequisites: [],
                coRequisites: []
            })
            const expectedCourse = {
                name: "CPSC",
                number: 107,
                school: school._id,
                credits: 3,
                preRequisites: [
                    {
                        name: "CPSC",
                        number: 103,
                        school: school._id,
                        credits: 3,
                        preRequisites: [],
                        coRequisites: [],
                        __v: 0,
                        _id: cpsc103._id
                    }
                ],
                coRequisites: [],
                __v: 0,
                _id: cpsc107._id
            };
            const req = {
                params: {
                    school: school.name,
                    courseName: cpsc107.name,
                    courseNumber: cpsc107.number
                }
            };
            const res = {
                status(status) {
                    expect(status).toBe(200);
                    return this;
                },
                json(result) {
                    expect(result.data).toEqual(expectedCourse);
                }
            }
            await getCourse(Course, School)(req, res);
            expect.assertions(2);
        });
        test("find all courses by school with nested pre-reqs", async () => {
            const school = await School.create({ name: "UBC" });
            const cpsc340 = await Course.create({
                name: "CPSC",
                number: 340,
                school: school._id,
                credits: 3,
                preRequisites: ["CPSC 221"],
                coRequisites: []
            });
            const cpsc221 = await Course.create({
                name: "CPSC",
                number: 221,
                school: school._id,
                credits: 4,
                preRequisites: ["CPSC 210"],
                coRequisites: []
            });
            const cpsc210 = await Course.create({
                name: "CPSC",
                number: 210,
                school: school._id,
                credits: 4,
                preRequisites: ["CPSC 110"],
                coRequisites: []
            });
            const cpsc110 = await Course.create({
                name: "CPSC",
                number: 110,
                school: school._id,
                credits: 4,
                preRequisites: [],
                coRequisites: []
            });
            const expectedCourse = {
                name: "CPSC",
                number: 340,
                school: school._id,
                credits: 3,
                preRequisites: [
                    {
                        name: "CPSC",
                        number: 221,
                        school: school._id,
                        credits: 4,
                        preRequisites: [
                            {
                                name: "CPSC",
                                number: 210,
                                school: school._id,
                                credits: 4,
                                preRequisites: [
                                    {
                                        name: "CPSC",
                                        number: 110,
                                        school: school._id,
                                        credits: 4,
                                        preRequisites: [],
                                        coRequisites: [],
                                        __v: 0,
                                        _id: cpsc110._id
                                    }
                                ],
                                coRequisites: [],
                                __v: 0,
                                _id: cpsc210._id
                            }
                        ],
                        coRequisites: [],
                        __v: 0,
                        _id: cpsc221._id
                    }
                ],
                coRequisites: [],
                __v: 0,
                _id: cpsc340._id
            };
            const req = {
                params: {
                    school: school.name,
                    courseName: cpsc340.name,
                    courseNumber: cpsc340.number
                }
            };
            const res = {
                status(status) {
                    expect(status).toBe(200);
                    return this;
                },
                json(result) {
                    expect(result.data).toEqual(expectedCourse);
                }
            }
            await getCourse(Course, School)(req, res);
            expect.assertions(2);
        });
    });
});
