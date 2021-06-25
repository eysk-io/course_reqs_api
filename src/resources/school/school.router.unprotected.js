import { Router } from "express";
import schoolCrudControllers from "./school.controllers";

const router = Router();

// /api/school
router
    .route("/")
    .get(schoolCrudControllers.getAllSchools)

// /api/school/:schoolName
router
    .route("/:schoolName")
    .get(schoolCrudControllers.getSchool)

export default router;
