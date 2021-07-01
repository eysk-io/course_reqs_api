import {
    getAllCoursesBySchool,
    createCourse,
    getAllCoursesBySchoolAndDepartment,
    removeAllCoursesBySchoolAndDepartment,
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
                    department: "CPSC",
                    number: 110,
                    credits: 4,
                    title: "Computation, Programs, and Programming",
                    description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                    preRequisites: [],
                    coRequisites: []
                }
            };
            const expectedCourse = {
                department: "CPSC",
                number: 110,
                credits: 4,
                title: "Computation, Programs, and Programming",
                description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
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
                    expect(result.data.department.toString()).toEqual(expectedCourse.department.toString());
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
                    department: "CPSC",
                    number: 110,
                    credits: 4,
                    title: "Computation, Programs, and Programming",
                    description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
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
                department: "CPSC",
                number: 110,
                school: school._id,
                credits: 4,
                title: "Computation, Programs, and Programming",
                description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
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
                department: "CPSC",
                number: 110,
                credits: 4,
                title: "Computation, Programs, and Programming",
                description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
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
                department: "CPSC",
                number: 107,
                school: school._id,
                title: "Systematic Program Design",
                description: "Fundamental computation and program structures. Continuing systematic program design from CPSC 103.",
                credits: 3,
                preRequisites: ["CPSC 103"],
                coRequisites: []
            });
            const cpsc103 = await Course.create({
                department: "CPSC",
                number: 103,
                school: school._id,
                credits: 3,
                title: "Introduction to Systematic Program Design",
                description: "Computation as a tool for systematic problem solving in non-computer-science disciplines. Introductory programming skills. Not for credit for students who have credit for, or exemption from, or are concurrently taking CPSC 110 or APSC 160. No programming experience expected.",
                preRequisites: [],
                coRequisites: []
            })
            const expectedCourse = {
                department: "CPSC",
                number: 107,
                school: school._id,
                credits: 3,
                title: "Systematic Program Design",
                description: "Fundamental computation and program structures. Continuing systematic program design from CPSC 103.",
                preRequisites: [
                    {
                        department: "CPSC",
                        number: 103,
                        school: school._id,
                        title: "Introduction to Systematic Program Design",
                        description: "Computation as a tool for systematic problem solving in non-computer-science disciplines. Introductory programming skills. Not for credit for students who have credit for, or exemption from, or are concurrently taking CPSC 110 or APSC 160. No programming experience expected.",
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
                    courseDepartment: cpsc107.department,
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
                department: "CPSC",
                number: 340,
                school: school._id,
                title: "Machine Learning and Data Mining",
                description: "Models of algorithms for dimensionality reduction, nonlinear regression, classification, clustering and unsupervised learning; applications to computer graphics, computer games, bio-informatics, information retrieval, e-commerce, databases, computer vision and artificial intelligence.",
                credits: 3,
                preRequisites: ["CPSC 221"],
                coRequisites: []
            });
            const cpsc221 = await Course.create({
                department: "CPSC",
                number: 221,
                school: school._id,
                title: "Basic Algorithms and Data Structures",
                description: "Design and analysis of basic algorithms and data structures; algorithm analysis methods, searching and sorting algorithms, basic data structures, graphs and concurrency.",
                credits: 4,
                preRequisites: ["CPSC 210"],
                coRequisites: []
            });
            const cpsc210 = await Course.create({
                department: "CPSC",
                number: 210,
                school: school._id,
                title: "Software Construction",
                description: "Design, development, and analysis of robust software components. Topics such as software design, computational models, data structures, debugging, and testing.",
                credits: 4,
                preRequisites: ["CPSC 110"],
                coRequisites: []
            });
            const cpsc110 = await Course.create({
                department: "CPSC",
                number: 110,
                school: school._id,
                title: "Computation, Programs, and Programming",
                description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                credits: 4,
                preRequisites: [],
                coRequisites: []
            });
            const expectedCourse = {
                department: "CPSC",
                number: 340,
                school: school._id,
                title: "Machine Learning and Data Mining",
                description: "Models of algorithms for dimensionality reduction, nonlinear regression, classification, clustering and unsupervised learning; applications to computer graphics, computer games, bio-informatics, information retrieval, e-commerce, databases, computer vision and artificial intelligence.",
                credits: 3,
                preRequisites: [
                    {
                        department: "CPSC",
                        number: 221,
                        school: school._id,
                        title: "Basic Algorithms and Data Structures",
                        description: "Design and analysis of basic algorithms and data structures; algorithm analysis methods, searching and sorting algorithms, basic data structures, graphs and concurrency.",
                        credits: 4,
                        preRequisites: [
                            {
                                department: "CPSC",
                                number: 210,
                                school: school._id,
                                title: "Software Construction",
                                description: "Design, development, and analysis of robust software components. Topics such as software design, computational models, data structures, debugging, and testing.",
                                credits: 4,
                                preRequisites: [
                                    {
                                        department: "CPSC",
                                        number: 110,
                                        title: "Computation, Programs, and Programming",
                                        description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
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
                    courseDepartment: cpsc340.department,
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
                department: "CPSC",
                number: 210,
                school: school._id,
                title: "Software Construction",
                description: "Design, development, and analysis of robust software components. Topics such as software design, computational models, data structures, debugging, and testing.",
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
                department: "CPSC",
                number: 110,
                title: "Computation, Programs, and Programming",
                description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                school: school._id,
                credits: 4,
                preRequisites: [],
                coRequisites: []
            });
            const cpsc107 = await Course.create({
                department: "CPSC",
                number: 107,
                school: school._id,
                title: "Systematic Program Design",
                description: "Fundamental computation and program structures. Continuing systematic program design from CPSC 103.",
                credits: 3,
                preRequisites: ["CPSC 103"],
                coRequisites: []
            });
            const cpsc103 = await Course.create({
                department: "CPSC",
                number: 103,
                school: school._id,
                title: "Introduction to Systematic Program Design",
                description: "Computation as a tool for systematic problem solving in non-computer-science disciplines. Introductory programming skills. Not for credit for students who have credit for, or exemption from, or are concurrently taking CPSC 110 or APSC 160. No programming experience expected.",
                credits: 3,
                preRequisites: [],
                coRequisites: []
            });
            const expectedCourse = {
                department: "CPSC",
                number: 210,
                school: school._id,
                title: "Software Construction",
                description: "Design, development, and analysis of robust software components. Topics such as software design, computational models, data structures, debugging, and testing.",
                credits: 4,
                preRequisites: [
                    {
                        oneOf: [
                            {
                                department: "CPSC",
                                number: 110,
                                title: "Computation, Programs, and Programming",
                                description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                                school: school._id,
                                credits: 4,
                                preRequisites: [],
                                coRequisites: [],
                                __v: 0,
                                _id: cpsc110._id
                            },
                            {
                                department: "CPSC",
                                number: 107,
                                title: "Systematic Program Design",
                                description: "Fundamental computation and program structures. Continuing systematic program design from CPSC 103.",
                                school: school._id,
                                credits: 3,
                                preRequisites: [
                                    {
                                        department: "CPSC",
                                        number: 103,
                                        school: school._id,
                                        title: "Introduction to Systematic Program Design",
                                        description: "Computation as a tool for systematic problem solving in non-computer-science disciplines. Introductory programming skills. Not for credit for students who have credit for, or exemption from, or are concurrently taking CPSC 110 or APSC 160. No programming experience expected.",
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
                    courseDepartment: cpsc210.department,
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
                department: "PHYS",
                number: 158,
                credits: 3,
                school: school._id,
                title: "Introductory Physics for Engineers II",
                description: "Electricity and magnetism, DC and AC circuits, optics. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
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
                department: "PHYS",
                number: 157,
                credits: 3,
                school: school._id,
                title: "Introductory Physics for Engineers I",
                description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
                preRequisites: [],
                coRequisites: []
            });
            const math101 = await Course.create({
                department: "MATH",
                number: 101,
                credits: 3,
                school: school._id,
                title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                preRequisites: [],
                coRequisites: []
            });
            const math103 = await Course.create({
                department: "MATH",
                number: 103,
                credits: 3,
                school: school._id,
                title: "Integral Calculus with Applications to Life Sciences",
                description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                preRequisites: [],
                coRequisites: []
            });
            const expectedCourse = {
                department: "PHYS",
                number: 158,
                school: school._id,
                title: "Introductory Physics for Engineers II",
                description: "Electricity and magnetism, DC and AC circuits, optics. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
                credits: 3,
                preRequisites: [
                    {
                        department: "PHYS",
                        number: 157,
                        school: school._id,
                        title: "Introductory Physics for Engineers I",
                        description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
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
                                department: "MATH",
                                number: 101,
                                school: school._id,
                                credits: 3,
                                title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                                description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                                preRequisites: [],
                                coRequisites: [],
                                __v: 0,
                                _id: math101._id
                            },
                            {
                                department: "MATH",
                                number: 103,
                                school: school._id,
                                credits: 3,
                                title: "Integral Calculus with Applications to Life Sciences",
                                description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
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
                    courseDepartment: phys158.department,
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
        test("find all courses by school with reqs that contain 'scoreOf' requirements", async () => {
            const school = await School.create({ name: "UBC" });
            const math221 = await Course.create({
                department: "MATH",
                number: 221,
                credits: 3,
                title: "Matrix Algebra",
                description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [
                    {
                        scoreOf: 64,
                        metric: "percentage",
                        courses: [
                            "PHYS 157"
                        ]
                    },
                    "MATH 101",
                    "MATH 103"
                ],
                coRequisites: [
                    "MATH 101",
                    "MATH 103"
                ]
            });
            const phys157 = await Course.create({
                department: "PHYS",
                number: 157,
                credits: 3,
                title: "Introductory Physics for Engineers I",
                description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const math101 = await Course.create({
                department: "MATH",
                number: 101,
                credits: 3,
                title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const math103 = await Course.create({
                department: "MATH",
                number: 103,
                credits: 3,
                title: "Integral Calculus with Applications to Life Sciences",
                description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const req = {
                params: {
                    school: school.name,
                    courseDepartment: math221.department,
                    courseNumber: math221.number
                }
            };
            const expectedCourse = {
                department: "MATH",
                number: 221,
                school: school._id,
                title: "Matrix Algebra",
                description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                credits: 3,
                preRequisites: [
                    {
                        scoreOf: 64,
                        metric: "percentage",
                        courses: [
                            {
                                department: "PHYS",
                                number: 157,
                                credits: 3,
                                title: "Introductory Physics for Engineers I",
                                description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
                                school: school._id,
                                preRequisites: [],
                                coRequisites: [],
                                __v: 0,
                                _id: phys157._id
                            }
                        ]
                    },
                    {
                        department: "MATH",
                        number: 101,
                        credits: 3,
                        school: school._id,
                        title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                        description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                        preRequisites: [],
                        coRequisites: [],
                        __v: 0,
                        _id: math101._id
                    },
                    {
                        department: "MATH",
                        number: 103,
                        credits: 3,
                        school: school._id,
                        title: "Integral Calculus with Applications to Life Sciences",
                        description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                        preRequisites: [],
                        coRequisites: [],
                        __v: 0,
                        _id: math103._id
                    }
                ],
                coRequisites: [
                    {
                        department: "MATH",
                        number: 101,
                        school: school._id,
                        title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                        description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                        credits: 3,
                        preRequisites: [],
                        coRequisites: [],
                        __v: 0,
                        _id: math101._id
                    },
                    {
                        department: "MATH",
                        number: 103,
                        school: school._id,
                        title: "Integral Calculus with Applications to Life Sciences",
                        description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                        credits: 3,
                        preRequisites: [],
                        coRequisites: [],
                        __v: 0,
                        _id: math103._id
                    },
                ],
                __v: 0,
                _id: math221._id
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
        test("find all courses by school with reqs that contain nested 'scoreOf' requirements", async () => {
            const school = await School.create({ name: "UBC" });
            const math221 = await Course.create({
                department: "MATH",
                number: 221,
                credits: 3,
                title: "Matrix Algebra",
                description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [
                    {
                        oneOf: [
                            {
                                scoreOf: 64,
                                metric: "percentage",
                                courses: [
                                    "PHYS 157"
                                ]
                            },
                            "MATH 101",
                        ]
                    },
                    "MATH 103"
                ],
                coRequisites: [
                    "MATH 101",
                    "MATH 103"
                ]
            });
            const phys157 = await Course.create({
                department: "PHYS",
                number: 157,
                credits: 3,
                title: "Introductory Physics for Engineers I",
                description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const math101 = await Course.create({
                department: "MATH",
                number: 101,
                credits: 3,
                title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const math103 = await Course.create({
                department: "MATH",
                number: 103,
                credits: 3,
                title: "Integral Calculus with Applications to Life Sciences",
                description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const req = {
                params: {
                    school: school.name,
                    courseDepartment: math221.department,
                    courseNumber: math221.number
                }
            };
            const expectedCourse = {
                department: "MATH",
                number: 221,
                school: school._id,
                title: "Matrix Algebra",
                description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                credits: 3,
                preRequisites: [
                    {
                        oneOf: [
                            {
                                scoreOf: 64,
                                metric: "percentage",
                                courses: [
                                    {
                                        department: "PHYS",
                                        number: 157,
                                        credits: 3,
                                        title: "Introductory Physics for Engineers I",
                                        description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
                                        school: school._id,
                                        preRequisites: [],
                                        coRequisites: [],
                                        __v: 0,
                                        _id: phys157._id
                                    }
                                ]
                            },
                            {
                                department: "MATH",
                                number: 101,
                                credits: 3,
                                title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                                description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                                school: school._id,
                                preRequisites: [],
                                coRequisites: [],
                                __v: 0,
                                _id: math101._id
                            },
                        ]
                    },
                    {
                        department: "MATH",
                        number: 103,
                        credits: 3,
                        title: "Integral Calculus with Applications to Life Sciences",
                        description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                        school: school._id,
                        preRequisites: [],
                        coRequisites: [],
                        __v: 0,
                        _id: math103._id
                    }
                ],
                coRequisites: [
                    {
                        department: "MATH",
                        number: 101,
                        title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                        description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                        school: school._id,
                        credits: 3,
                        preRequisites: [],
                        coRequisites: [],
                        __v: 0,
                        _id: math101._id
                    },
                    {
                        department: "MATH",
                        number: 103,
                        school: school._id,
                        credits: 3,
                        title: "Integral Calculus with Applications to Life Sciences",
                        description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                        preRequisites: [],
                        coRequisites: [],
                        __v: 0,
                        _id: math103._id
                    },
                ],
                __v: 0,
                _id: math221._id
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
        test("find all courses by school with reqs that contain 'oneOf' requirements within 'scoreOf' requirements", async () => {
            const school = await School.create({ name: "UBC" });
            const math221 = await Course.create({
                department: "MATH",
                number: 221,
                credits: 3,
                title: "Matrix Algebra",
                description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [
                    {
                        scoreOf: 64,
                        metric: "percentage",
                        courses: [
                            {
                                oneOf: [
                                    "MATH 101",
                                    "PHYS 157"
                                ]
                            }
                        ]
                    },
                    "MATH 103"
                ],
                coRequisites: [
                    "MATH 101",
                    "MATH 103"
                ]
            });
            const phys157 = await Course.create({
                department: "PHYS",
                number: 157,
                credits: 3,
                title: "Introductory Physics for Engineers I",
                description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const math101 = await Course.create({
                department: "MATH",
                number: 101,
                credits: 3,
                title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const math103 = await Course.create({
                department: "MATH",
                number: 103,
                title: "Integral Calculus with Applications to Life Sciences",
                description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                credits: 3,
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const req = {
                params: {
                    school: school.name,
                    courseDepartment: math221.department,
                    courseNumber: math221.number
                }
            };
            const expectedCourse = {
                department: "MATH",
                number: 221,
                school: school._id,
                credits: 3,
                title: "Matrix Algebra",
                description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                preRequisites: [
                    {
                        scoreOf: 64,
                        metric: "percentage",
                        courses: [
                            {
                                oneOf: [
                                    {
                                        department: "MATH",
                                        number: 101,
                                        credits: 3,
                                        title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                                        description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                                        school: school._id,
                                        preRequisites: [],
                                        coRequisites: [],
                                        __v: 0,
                                        _id: math101._id
                                    },
                                    {
                                        department: "PHYS",
                                        number: 157,
                                        credits: 3,
                                        title: "Introductory Physics for Engineers I",
                                        description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
                                        school: school._id,
                                        preRequisites: [],
                                        coRequisites: [],
                                        __v: 0,
                                        _id: phys157._id
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        department: "MATH",
                        number: 103,
                        credits: 3,
                        title: "Integral Calculus with Applications to Life Sciences",
                        description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                        school: school._id,
                        preRequisites: [],
                        coRequisites: [],
                        __v: 0,
                        _id: math103._id
                    }
                ],
                coRequisites: [
                    {
                        department: "MATH",
                        number: 101,
                        school: school._id,
                        credits: 3,
                        title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                        description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                        preRequisites: [],
                        coRequisites: [],
                        __v: 0,
                        _id: math101._id
                    },
                    {
                        department: "MATH",
                        number: 103,
                        school: school._id,
                        credits: 3,
                        title: "Integral Calculus with Applications to Life Sciences",
                        description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                        preRequisites: [],
                        coRequisites: [],
                        __v: 0,
                        _id: math103._id
                    },
                ],
                __v: 0,
                _id: math221._id
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
        test("find all courses by school with reqs that contain 'advancedCredit' requirements", async () => {
            const school = await School.create({ name: "UBC" });
            const math221 = await Course.create({
                department: "MATH",
                number: 221,
                credits: 3,
                title: "Matrix Algebra",
                description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [
                    {
                        scoreOf: 64,
                        metric: "percentage",
                        courses: [
                            {
                                oneOf: [
                                    "MATH 101",
                                    "PHYS 157"
                                ]
                            }
                        ]
                    },
                    {
                        advancedCredit: [
                            "MATH 103"
                        ]
                    }
                ],
                coRequisites: [
                    "MATH 101",
                    "MATH 103"
                ]
            });
            const phys157 = await Course.create({
                department: "PHYS",
                number: 157,
                credits: 3,
                title: "Introductory Physics for Engineers I",
                description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const math101 = await Course.create({
                department: "MATH",
                number: 101,
                credits: 3,
                school: school._id,
                title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                preRequisites: [],
                coRequisites: []
            });
            const math103 = await Course.create({
                department: "MATH",
                number: 103,
                credits: 3,
                title: "Integral Calculus with Applications to Life Sciences",
                description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const req = {
                params: {
                    school: school.name,
                    courseDepartment: math221.department,
                    courseNumber: math221.number
                }
            };
            const expectedCourse = {
                department: "MATH",
                number: 221,
                school: school._id,
                credits: 3,
                title: "Matrix Algebra",
                description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                preRequisites: [
                    {
                        scoreOf: 64,
                        metric: "percentage",
                        courses: [
                            {
                                oneOf: [
                                    {
                                        department: "MATH",
                                        number: 101,
                                        credits: 3,
                                        school: school._id,
                                        title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                                        description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                                        preRequisites: [],
                                        coRequisites: [],
                                        __v: 0,
                                        _id: math101._id
                                    },
                                    {
                                        department: "PHYS",
                                        number: 157,
                                        credits: 3,
                                        title: "Introductory Physics for Engineers I",
                                        description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
                                        school: school._id,
                                        preRequisites: [],
                                        coRequisites: [],
                                        __v: 0,
                                        _id: phys157._id
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        advancedCredit: [
                            {
                                department: "MATH",
                                number: 103,
                                credits: 3,
                                title: "Integral Calculus with Applications to Life Sciences",
                                description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                                school: school._id,
                                preRequisites: [],
                                coRequisites: [],
                                __v: 0,
                                _id: math103._id
                            }
                        ]
                    }
                ],
                coRequisites: [
                    {
                        department: "MATH",
                        number: 101,
                        school: school._id,
                        credits: 3,
                        title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                        description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                        preRequisites: [],
                        coRequisites: [],
                        __v: 0,
                        _id: math101._id
                    },
                    {
                        department: "MATH",
                        number: 103,
                        school: school._id,
                        credits: 3,
                        title: "Integral Calculus with Applications to Life Sciences",
                        description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                        preRequisites: [],
                        coRequisites: [],
                        __v: 0,
                        _id: math103._id
                    },
                ],
                __v: 0,
                _id: math221._id
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
        test("find all courses by school with reqs that contain nested 'advancedCredit' requirements", async () => {
            const school = await School.create({ name: "UBC" });
            const math221 = await Course.create({
                department: "MATH",
                number: 221,
                credits: 3,
                title: "Matrix Algebra",
                description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [
                    {
                        scoreOf: 64,
                        metric: "percentage",
                        courses: [
                            {
                                oneOf: [
                                    "MATH 101",
                                    "PHYS 157"
                                ]
                            }
                        ]
                    },
                    {
                        advancedCredit: [
                            "CPSC 210"
                        ]
                    }
                ],
                coRequisites: [
                    "MATH 101",
                    "MATH 103"
                ]
            });
            const cpsc210 = await Course.create({
                department: "CPSC",
                number: 210,
                school: school._id,
                title: "Matrix Algebra",
                description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                credits: 4,
                preRequisites: ["CPSC 110"],
                coRequisites: []
            });
            const cpsc110 = await Course.create({
                department: "CPSC",
                number: 110,
                title: "Computation, Programs, and Programming",
                description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                school: school._id,
                credits: 4,
                preRequisites: [],
                coRequisites: []
            });
            const phys157 = await Course.create({
                department: "PHYS",
                number: 157,
                credits: 3,
                title: "Introductory Physics for Engineers I",
                description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const math101 = await Course.create({
                department: "MATH",
                number: 101,
                title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                credits: 3,
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const math103 = await Course.create({
                department: "MATH",
                number: 103,
                credits: 3,
                title: "Integral Calculus with Applications to Life Sciences",
                description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const req = {
                params: {
                    school: school.name,
                    courseDepartment: math221.department,
                    courseNumber: math221.number
                }
            };
            const expectedCourse = {
                department: "MATH",
                number: 221,
                school: school._id,
                credits: 3,
                title: "Matrix Algebra",
                description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                preRequisites: [
                    {
                        scoreOf: 64,
                        metric: "percentage",
                        courses: [
                            {
                                oneOf: [
                                    {
                                        department: "MATH",
                                        number: 101,
                                        credits: 3,
                                        title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                                        description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                                        school: school._id,
                                        preRequisites: [],
                                        coRequisites: [],
                                        __v: 0,
                                        _id: math101._id
                                    },
                                    {
                                        department: "PHYS",
                                        number: 157,
                                        credits: 3,
                                        title: "Introductory Physics for Engineers I",
                                        description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
                                        school: school._id,
                                        preRequisites: [],
                                        coRequisites: [],
                                        __v: 0,
                                        _id: phys157._id
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        advancedCredit: [
                            {
                                department: "CPSC",
                                number: 210,
                                school: school._id,
                                title: "Matrix Algebra",
                                description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                                credits: 4,
                                preRequisites: [
                                    {
                                        department: "CPSC",
                                        number: 110,
                                        title: "Computation, Programs, and Programming",
                                        description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
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
                        ]
                    }
                ],
                coRequisites: [
                    {
                        department: "MATH",
                        number: 101,
                        school: school._id,
                        credits: 3,
                        title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                        description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                        preRequisites: [],
                        coRequisites: [],
                        __v: 0,
                        _id: math101._id
                    },
                    {
                        department: "MATH",
                        number: 103,
                        school: school._id,
                        credits: 3,
                        title: "Integral Calculus with Applications to Life Sciences",
                        description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                        preRequisites: [],
                        coRequisites: [],
                        __v: 0,
                        _id: math103._id
                    },
                ],
                __v: 0,
                _id: math221._id
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
        test("find all courses by school including reqs that are not courses within the system", async () => {
            const school = await School.create({ name: "UBC" });
            const math221 = await Course.create({
                department: "MATH",
                number: 221,
                credits: 3,
                title: "Matrix Algebra",
                description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [
                    {
                        scoreOf: 64,
                        metric: "percentage",
                        courses: [
                            "Principles of Mathematics 12 or Pre-calculus 12"
                        ]
                    }
                ],
                coRequisites: [
                    "MATH 101",
                    "MATH 103"
                ]
            });
            const math101 = await Course.create({
                department: "MATH",
                number: 101,
                credits: 3,
                title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const math103 = await Course.create({
                department: "MATH",
                number: 103,
                credits: 3,
                title: "Integral Calculus with Applications to Life Sciences",
                description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                school: school._id,
                preRequisites: [],
                coRequisites: []
            });
            const req = {
                params: {
                    school: school.name,
                    courseDepartment: math221.department,
                    courseNumber: math221.number
                }
            };
            const expectedCourse = {
                department: "MATH",
                number: 221,
                school: school._id,
                credits: 3,
                title: "Matrix Algebra",
                description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                preRequisites: [
                    {
                        scoreOf: 64,
                        metric: "percentage",
                        courses: [
                            {
                                department: "Principles of Mathematics 12 or Pre-calculus 12",
                                number: -1,
                                credits: 0,
                                school: school._id,
                                preRequisites: [],
                                coRequisites: [],
                                __v: 0,
                                _id: "-1"
                            }
                        ]
                    }
                ],
                coRequisites: [
                    {
                        department: "MATH",
                        number: 101,
                        school: school._id,
                        credits: 3,
                        title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                        description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                        preRequisites: [],
                        coRequisites: [],
                        __v: 0,
                        _id: math101._id
                    },
                    {
                        department: "MATH",
                        number: 103,
                        school: school._id,
                        credits: 3,
                        title: "Integral Calculus with Applications to Life Sciences",
                        description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                        preRequisites: [],
                        coRequisites: [],
                        __v: 0,
                        _id: math103._id
                    },
                ],
                __v: 0,
                _id: math221._id
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
                department: "CPSC",
                number: 110,
                title: "Computation, Programs, and Programming",
                description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                credits: 5,
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            const req = {
                params: {
                    school: schoolModel.name,
                    courseDepartment: "CPSC",
                    courseNumber: 110
                },
                body: {
                    department: "CPSC",
                    number: 110,
                    title: "Computation, Programs, and Programming",
                    description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                    credits: 4,
                    preRequisites: [],
                    coRequisites: []
                }
            };
            const expectedCourse = {
                department: "CPSC",
                number: 110,
                title: "Computation, Programs, and Programming",
                description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
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
                    expect(result.data.department.toString()).toEqual(expectedCourse.department.toString());
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
                department: "CPSC",
                number: 110,
                title: "Computation, Programs, and Programming",
                description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                credits: 4,
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            const req = {
                params: {
                    school: "SFU",
                    courseDepartment: "CPSC",
                    courseNumber: 110
                },
                body: {
                    department: "CPSC",
                    number: 110,
                    title: "Computation, Programs, and Programming",
                    description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
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
                department: "CPSC",
                number: 110,
                title: "Computation, Programs, and Programming",
                description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                credits: 4,
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            const req = {
                params: {
                    school: schoolModel.name,
                    courseDepartment: "CPSC",
                    courseNumber: 111
                },
                body: {
                    department: "CPSC",
                    number: 110,
                    title: "Computation, Programs, and Programming",
                    description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
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
    describe("removeCourse", async () => {
        test("remove a course", async () => {
            const schoolModel = await School.create({ name: "UBC" });
            const cpsc110 = await Course.create({
                department: "CPSC",
                number: 110,
                title: "Computation, Programs, and Programming",
                description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                credits: 4,
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            const req = {
                params: {
                    school: schoolModel.name,
                    courseDepartment: cpsc110.department,
                    courseNumber: cpsc110.number,
                }
            };
            const expectedCourse = {
                department: "CPSC",
                number: 110,
                title: "Computation, Programs, and Programming",
                description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                credits: 4,
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: [],
                __v: 0,
                _id: cpsc110._id
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
            await removeCourse(Course, School)(req, res);

            const newRes = {
                status(status) {
                    expect(status).toBe(400);
                    return this;
                },
                end() {
                    expect(true).toBe(true);
                }
            }
            await getCourse(Course, School)(req, newRes);
            expect.assertions(4);
        });
        test("400 if school not found", async () => {
            const schoolModel = await School.create({ name: "UBC" });
            const cpsc110 = await Course.create({
                department: "CPSC",
                number: 110,
                title: "Computation, Programs, and Programming",
                description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                credits: 4,
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            const req = {
                params: {
                    school: "SFU",
                    courseDepartment: cpsc110.department,
                    courseNumber: cpsc110.number
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
            await removeCourse(Course, School)(req, res);
            expect.assertions(2);
        });
        test("400 if course not found", async () => {
            const schoolModel = await School.create({ name: "UBC" });
            await Course.create({
                department: "CPSC",
                number: 110,
                title: "Computation, Programs, and Programming",
                description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                credits: 4,
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            const req = {
                params: {
                    school: schoolModel.name,
                    courseDepartment: "CPSC",
                    courseNumber: 111
                },
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
            await removeCourse(Course, School)(req, res);
            expect.assertions(2);
        });
    });
    describe("getAllCoursesBySchoolAndDepartment", async () => {
        test("get list of courses by school and name", async () => {
            const schoolModel = await School.create({ name: "UBC" });
            const cpsc110 = await Course.create({
                department: "CPSC",
                number: 110,
                title: "Computation, Programs, and Programming",
                description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                credits: 4,
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            const cpsc111 = await Course.create({
                department: "CPSC",
                number: 111,
                credits: 4,
                title: "Any title",
                description: "Any description",
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            const cpsc112 = await Course.create({
                department: "CPSC",
                number: 112,
                credits: 4,
                title: "Any title",
                description: "Any description",
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            const cpsc113 = await Course.create({
                department: "CPSC",
                number: 113,
                credits: 4,
                title: "Any title",
                description: "Any description",
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            const cpsc114 = await Course.create({
                department: "CPSC",
                number: 114,
                credits: 4,
                title: "Any title",
                description: "Any description",
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            const expectedCourseList = [
                {
                    department: "CPSC",
                    number: 110,
                    title: "Computation, Programs, and Programming",
                    description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                    credits: 4,
                    school: schoolModel._id,
                    preRequisites: [],
                    coRequisites: [],
                    __v: 0,
                    _id: cpsc110._id
                },
                {
                    department: "CPSC",
                    number: 111,
                    credits: 4,
                    title: "Any title",
                    description: "Any description",
                    school: schoolModel._id,
                    preRequisites: [],
                    coRequisites: [],
                    __v: 0,
                    _id: cpsc111._id
                },
                {
                    department: "CPSC",
                    number: 112,
                    credits: 4,
                    title: "Any title",
                    description: "Any description",
                    school: schoolModel._id,
                    preRequisites: [],
                    coRequisites: [],
                    __v: 0,
                    _id: cpsc112._id
                },
                {
                    department: "CPSC",
                    number: 113,
                    credits: 4,
                    title: "Any title",
                    description: "Any description",
                    school: schoolModel._id,
                    preRequisites: [],
                    coRequisites: [],
                    __v: 0,
                    _id: cpsc113._id
                },
                {
                    department: "CPSC",
                    number: 114,
                    credits: 4,
                    title: "Any title",
                    description: "Any description",
                    school: schoolModel._id,
                    preRequisites: [],
                    coRequisites: [],
                    __v: 0,
                    _id: cpsc114._id
                }
            ]
            const req = {
                params: {
                    school: schoolModel.name,
                    courseDepartment: "CPSC",
                },
            };
            const res = {
                status(status) {
                    expect(status).toBe(200);
                    return this;
                },
                json(result) {
                    expect(result.data).toEqual(expectedCourseList);
                }
            };
            await getAllCoursesBySchoolAndDepartment(Course, School)(req, res);
            expect.assertions(2);
        });
        test("404 if school not found", async () => {
            const req = {
                params: {
                    school: "UBC"
                },
                body: {
                    department: "CPSC",
                    number: 110,
                    title: "Computation, Programs, and Programming",
                    description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
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
            await getAllCoursesBySchoolAndDepartment(Course, School)(req, res);
            expect.assertions(2);
        });
    });
    describe("removeAllCoursesBySchoolAndDepartment", async () => {
        test("remove all courses that match given school and name", async () => {
            const schoolModel = await School.create({ name: "UBC" });
            await Course.create({
                department: "CPSC",
                number: 110,
                title: "Computation, Programs, and Programming",
                description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                credits: 4,
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            await Course.create({
                department: "CPSC",
                number: 111,
                credits: 4,
                title: "Any title",
                description: "Any description",
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            await Course.create({
                department: "CPSC",
                number: 112,
                credits: 4,
                title: "Any title",
                description: "Any description",
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            await Course.create({
                department: "CPSC",
                number: 113,
                credits: 4,
                title: "Any title",
                description: "Any description",
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            await Course.create({
                department: "CPSC",
                number: 114,
                credits: 4,
                title: "Any title",
                description: "Any description",
                school: schoolModel._id,
                preRequisites: [],
                coRequisites: []
            });
            const expectedResult = {
                n: 5,
                ok: 1,
                deletedCount: 5
            }

            const req = {
                params: {
                    school: schoolModel.name,
                    courseDepartment: "CPSC",
                },
            };
            const res = {
                status(status) {
                    expect(status).toBe(200);
                    return this;
                },
                json(result) {
                    expect(result.data).toEqual(expectedResult);
                }
            };
            await removeAllCoursesBySchoolAndDepartment(Course, School)(req, res);

            const newRes = {
                status(status) {
                    expect(status).toBe(200);
                    return this;
                },
                json(result) {
                    expect(result.data).toEqual([]);
                }
            };
            await getAllCoursesBySchoolAndDepartment(Course, School)(req, newRes);
            expect.assertions(4);
        });
        test("404 if school not found", async () => {
            const req = {
                params: {
                    school: "UBC",
                    courseDepartment: "CPSC"
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
            await removeAllCoursesBySchoolAndDepartment(Course, School)(req, res);
            expect.assertions(2);
        });
    });
});
