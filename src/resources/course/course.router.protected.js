import { Router } from "express";
import courseCrudControllers from "./course.controllers";

const router = Router();

// /api/course/:school
router
    .route("/:school")
    .post(courseCrudControllers.createCourse)

// /api/course/:school/:courseName
router
    .route("/:school/:courseName")
    .delete(courseCrudControllers.removeAllCoursesBySchoolAndName)

// /api/course/:school/:courseName/:courseNumber
router
    .route("/:school/:courseName/:courseNumber")
    .put(courseCrudControllers.updateCourse)
    .delete(courseCrudControllers.removeCourse)

export default router;
