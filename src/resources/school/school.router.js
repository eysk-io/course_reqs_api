import { Router } from "express";
import schoolCrudControllers from "../../utils/school.crud";

const router = Router();

// /api/school
router
    .route("/")
    .get(schoolCrudControllers.getAllSchools)
    .post(schoolCrudControllers.createSchool)

// /api/school/:schoolName
router
    .route("/:schoolName")
    .get(schoolCrudControllers.getSchool)
    .put(schoolCrudControllers.updateSchool)
    .delete(schoolCrudControllers.removeSchool)

export default router;
