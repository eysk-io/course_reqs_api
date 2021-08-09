import controllers from "../course.controllers";
import { isFunction } from "lodash";

describe("course controllers", () => {
    test("has crud controllers", () => {
        const crudMethods = [
            "getAllCoursesBySchool",
            "createCourse",
            "getAllCoursesBySchoolAndSubject",
            "removeAllCoursesBySchoolAndSubject",
            "getCourse",
            "updateCourse",
            "removeCourse"
        ];

        crudMethods.forEach(name => {
            expect(isFunction(controllers[name])).toBe(true)
        });
    });
});
