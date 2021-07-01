import { Router } from "express";
import courseCrudControllers from "./course.controllers";

const router = Router();

// /api/course/:school
router
    .route("/:school")
    .post(courseCrudControllers.createCourse)

// /api/course/:school/:courseDepartment
router
    .route("/:school/:courseDepartment")
    .delete(courseCrudControllers.removeAllCoursesBySchoolAndDepartment)

// /api/course/:school/:courseDepartment/:courseNumber
router
    .route("/:school/:courseDepartment/:courseNumber")
    .put(courseCrudControllers.updateCourse)
    .delete(courseCrudControllers.removeCourse)

export default router;
