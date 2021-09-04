import { Router } from "express";
import schoolCrudControllers from "./school.controllers";

const router = Router();

// /school
router
    .route("/")
    .get(schoolCrudControllers.getAllSchools)

// /school/:schoolName
router
    .route("/:schoolName")
    .get(schoolCrudControllers.getSchool)

export default router;
