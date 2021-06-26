import { getSchool, getAllSchools, createSchool, updateSchool, removeSchool } from "../school.crud";
import { School } from "../../../resources/school/school.model";

describe("school crud functions", () => {
    describe("getSchool", async () => {
        test("find school by name", async () => {
            const school = await School.create({ name: "UBC" });
            const req = {
                params: {
                    schoolName: school.name
                }
            }
            const res = {
                status(status) {
                    expect(status).toBe(200);
                    return this;
                },
                json(result) {
                    expect(result.data._id.toString()).toBe(school._id.toString());
                    expect(result.data.name.toString()).toBe(school.name.toString());
                }
            }
            await getSchool(School)(req, res);
            expect.assertions(3);
        });

        await test("404 if school does not exist", async () => {
            const school = await School.create({ name: "UBC" });
            const req = {
                params: {
                    id: school._id,
                    schoolName: "SFU"
                }
            }
            const res = {
                status(status) {
                    expect(status).toBe(404);
                    expect(status).not.toBe(400);
                    return this;
                },
                end() {
                    expect(true).toBe(true);
                }
            }
            await getSchool(School)(req, res);
            expect.assertions(3);
        });
    });
    describe("getAllSchools", async () => {
        test("get all schools", async () => {
            await School.create({ name: "UBC" });
            await School.create({ name: "SFU" });
            await School.create({ name: "BCIT" });
            const req = {};
            const res = {
                status(status) {
                    expect(status).toBe(200);
                    return this;
                },
                json(result) {
                    expect(result.data).toHaveLength(3);
                }
            };
            await getAllSchools(School)(req, res);
            expect.assertions(2);
        });
    });
    describe("createSchool", async () => {
        test("create a new school", async () => {
            const body = {
                name: "UBC"
            }

            const req = {
                body
            }

            const res = {
                status(status) {
                    expect(status).toBe(201);
                    return this;
                },
                json(result) {
                    expect(result.data.name).toBe(body.name);
                }
            }
            await createSchool(School)(req, res);
            expect.assertions(2);
        });
    });
    describe("updateSchool", async () => {
        test("update an existing school", async () => {
            await School.create({ name: "UBC" });
            const newName = "SFU";
            const req = {
                params: {
                    schoolName: "UBC"
                },
                body: {
                    name: newName
                }
            };

            const res = {
                status(status) {
                    expect(status).toBe(200);
                    return this;
                },
                json(result) {
                    expect(result.data.name).toBe(newName);
                }
            };
            await updateSchool(School)(req, res);
            expect.assertions(2);
        });
        test("400 if school does not exist", async () => {
            await School.create({ name: "UBC" });
            const newName = "SFU";
            const req = {
                params: {
                    schoolName: "BCIT"
                },
                body: {
                    name: newName
                }
            };

            const res = {
                status(status) {
                    expect(status).toBe(400);
                    return this;
                }
            };
            await updateSchool(School)(req, res);
            expect.assertions(1);
        });
    });
    describe("removeSchool", async () => {
        test("remove an existing school", async () => {
            const school = await School.create({ name: "UBC" });
            const req = {
                params: {
                    schoolName: "UBC"
                }
            };

            const res = {
                status(status) {
                    expect(status).toBe(200);
                    return this;
                },
                json(result) {
                    expect(result.data.name).toBe(school.name);
                }
            };
            await removeSchool(School)(req, res);
            expect.assertions(2);
        });
        test("400 if school does not exist", async () => {
            await School.create({ name: "UBC" });
            const req = {
                params: {
                    schoolName: "SFU"
                }
            };

            const res = {
                status(status) {
                    expect(status).toBe(400);
                    return this;
                }
            };
            await removeSchool(School)(req, res);
            expect.assertions(1);
        });
    });
});
