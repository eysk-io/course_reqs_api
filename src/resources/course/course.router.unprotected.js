import { Router } from "express";
import courseCrudControllers from "./course.controllers";

const router = Router();

// /api/course/:school
router
    .route("/:school")
    .get(courseCrudControllers.getAllCoursesBySchool)

// /api/course/:school/:courseDepartment
router
    .route("/:school/:courseDepartment")
    .get(courseCrudControllers.getAllCoursesBySchoolAndDepartment)

// /api/course/:school/:courseDepartment/:courseNumber
router
    .route("/:school/:courseDepartment/:courseNumber")
    .get(courseCrudControllers.getCourse)

export default router;
