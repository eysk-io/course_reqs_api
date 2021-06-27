import { Router } from "express";
import courseCrudControllers from "./course.controllers";

const router = Router();

// /api/course/:school
router
    .route("/:school")
    .get(courseCrudControllers.getAllCoursesBySchool)

// /api/course/:school/:courseName
router
    .route("/:school/:courseName")
    .get(courseCrudControllers.getAllCoursesByName)

// /api/course/:school/:courseName/:courseNumber
router
    .route("/:school/:courseName/:courseNumber")
    .get(courseCrudControllers.getCourse)

export default router;
