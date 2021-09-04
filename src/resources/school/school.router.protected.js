import { Router } from "express";
import schoolCrudControllers from "./school.controllers";

const router = Router();

// /school
router
    .route("/")
    .post(schoolCrudControllers.createSchool)

// /school/:schoolName
router
    .route("/:schoolName")
    .put(schoolCrudControllers.updateSchool)
    .delete(schoolCrudControllers.removeSchool)

export default router;
