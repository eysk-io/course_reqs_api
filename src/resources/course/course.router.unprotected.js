import { Router } from "express";
import courseCrudControllers from "./course.controllers";

const router = Router();

// /api/course/:school
router
    .route("/:school")
    .get(courseCrudControllers.getAllCoursesBySchool)

// /api/course/:school/:subject
router
    .route("/:school/:subject")
    .get(courseCrudControllers.getAllCoursesBySchoolAndSubject)

// /api/course/:school/:subject/:courseCode
router
    .route("/:school/:subject/:courseCode")
    .get(courseCrudControllers.getCourse)

export default router;
