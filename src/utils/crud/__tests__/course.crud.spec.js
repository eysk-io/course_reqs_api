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
        test("400 if school not found", async () => {
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
        test("find all courses by school with oneOf pre-reqs", async () => {
            const school = await School.create({ name: "UBC" });
            const cpsc210 = await Course.create({
                name: "CPSC",
                number: 210,
                school: school._id,
                credits: 4,
                preRequisites: [
                    {
                        oneOf: [
                            "CPSC 110", "CPSC 107"
                        ]
                    }
                ],
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
            });
            const expectedCourse = {
                name: "CPSC",
                number: 210,
                school: school._id,
                credits: 4,
                preRequisites: [
                    {
                        oneOf: [
                            {
                                name: "CPSC",
                                number: 110,
                                school: school._id,
                                credits: 4,
                                preRequisites: [],
                                coRequisites: [],
                                __v: 0,
                                _id: cpsc110._id
                            },
                            {
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
                            }
                        ]
                    }
                ],
                coRequisites: [],
                __v: 0,
                _id: cpsc210._id
            };
            const req = {
                params: {
                    school: school.name,
                    courseName: cpsc210.name,
                    courseNumber: cpsc210.number
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
        test("find all courses by school with co-reqs", async () => {
            const school = await School.create({ name: "UBC" });
            const phys158 = await Course.create({
                name: "PHYS",
                number: 158,
                credits: 3,
                school: school._id,
                preRequisites: ["PHYS 157"],
                coRequisites: [
                    {
                        oneOf: [
                            "MATH 101",
                            "MATH 103"
                        ]
                    }
                ]
            });
            const phys157 = await Course.create({
                name: "PHYS",
                number: 157,
                credits: 3,
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const math101 = await Course.create({
                name: "MATH",
                number: 101,
                credits: 3,
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const math103 = await Course.create({
                name: "MATH",
                number: 103,
                credits: 3,
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const expectedCourse = {
                name: "PHYS",
                number: 158,
                school: school._id,
                credits: 3,
                preRequisites: [
                    {
                        name: "PHYS",
                        number: 157,
                        school: school._id,
                        credits: 3,
                        preRequisites: [],
                        coRequisites: [],
                        __v: 0,
                        _id: phys157._id
                    },
                ],
                coRequisites: [
                    {
                        oneOf: [
                            {
                                name: "MATH",
                                number: 101,
                                school: school._id,
                                credits: 3,
                                preRequisites: [],
                                coRequisites: [],
                                __v: 0,
                                _id: math101._id
                            },
                            {
                                name: "MATH",
                                number: 103,
                                school: school._id,
                                credits: 3,
                                preRequisites: [],
                                coRequisites: [],
                                __v: 0,
                                _id: math103._id
                            },
                        ]
                    }
                ],
                __v: 0,
                _id: phys158._id
            };
            const req = {
                params: {
                    school: school.name,
                    courseName: phys158.name,
                    courseNumber: phys158.number
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
    describe("updateCourse", async () => {
        test("update a course's information", async () => {
            const schoolModel = await School.create({ name: "UBC" });
            await Course.create({
                name: "CPSC",
                number: 110,
                credits: 5,
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            const req = {
                params: {
                    school: schoolModel.name,
                    courseName: "CPSC",
                    courseNumber: 110
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
                credits: 5,
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            };
            const res = {
                status(status) {
                    expect(status).toBe(200);
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
            await updateCourse(Course, School)(req, res);

            const newRes = {
                status(status) {
                    expect(status).toBe(200);
                    return this;
                },
                json(result) {
                    expect(result.data.credits).toEqual(req.body.credits);
                }
            }
            await getCourse(Course, School)(req, newRes);
            expect.assertions(8);
        });
        test("400 if school not found", async () => {
            const schoolModel = await School.create({ name: "UBC" });
            await Course.create({
                name: "CPSC",
                number: 110,
                credits: 4,
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            const req = {
                params: {
                    school: "SFU",
                    courseName: "CPSC",
                    courseNumber: 110
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
                    expect(status).toBe(400);
                    return this;
                },
                end() {
                    expect(true).toBe(true);
                }
            }
            await updateCourse(Course, School)(req, res);
            expect.assertions(2);
        });
        test("400 if course not found", async () => {
            const schoolModel = await School.create({ name: "UBC" });
            await Course.create({
                name: "CPSC",
                number: 110,
                credits: 4,
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            const req = {
                params: {
                    school: schoolModel.name,
                    courseName: "CPSC",
                    courseNumber: 111
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
                    expect(status).toBe(400);
                    return this;
                },
                end() {
                    expect(true).toBe(true);
                }
            }
            await updateCourse(Course, School)(req, res);
            expect.assertions(2);
        });
    });
});
