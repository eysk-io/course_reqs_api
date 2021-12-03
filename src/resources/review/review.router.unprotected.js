import { Router } from "express";
import reviewCrudControllers from "./review.controllers";

const router = Router();

// /review/:subject/:courseCode
router
    .route("/:subject/:courseCode")
    .get(reviewCrudControllers.getAllCourseReviews)
    .post(reviewCrudControllers.createCourseReview)

// /review/index/:subject/:courseCode
router
    .route("/index/:subject/:courseCode")
    .get(reviewCrudControllers.getCourseIndex)
// .post(reviewCrudControllers.createCourseIndex)

export default router;