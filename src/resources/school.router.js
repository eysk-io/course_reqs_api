import { Router } from "express";

const router = Router();

const controller = (req, res) => {
    res.send({ message: "hello" });
}

// /api/school
router
    .route("/")
    .get(controller)
    .post(controller)

// /api/school/:courseName
router
    .route("/:courseName")
    .put(controller)
    .delete(controller)
    .get(controller)

// /api/school/:courseName/:courseNumber
router
    .route("/:courseName/:courseNumber")
    .put(controller)
    .delete(controller)
    .get(controller)

export default router;
