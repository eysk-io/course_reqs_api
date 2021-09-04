import { Router } from "express";
import courseCrudControllers from "./course.controllers";

const router = Router();

// /course/:school
router
    .route("/:school")
    .post(courseCrudControllers.createCourse)

// /course/:school/:subject
router
    .route("/:school/:subject")
    .delete(courseCrudControllers.removeAllCoursesBySchoolAndSubject)

// /course/:school/:subject/:courseCode
router
    .route("/:school/:subject/:courseCode")
    .put(courseCrudControllers.updateCourse)
    .delete(courseCrudControllers.removeCourse)

export default router;
