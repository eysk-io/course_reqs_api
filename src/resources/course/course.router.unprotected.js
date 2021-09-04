import { Router } from "express";
import courseCrudControllers from "./course.controllers";

const router = Router();

// /course/:school
router
    .route("/:school")
    .get(courseCrudControllers.getAllCoursesBySchool)

// /course/:school/:subject
router
    .route("/:school/:subject")
    .get(courseCrudControllers.getAllCoursesBySchoolAndSubject)

// /course/:school/:subject/:courseCode
router
    .route("/:school/:subject/:courseCode")
    .get(courseCrudControllers.getCourse)

export default router;
