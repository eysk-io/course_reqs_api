import { courseCrudControllers } from "../../utils/crud/course.crud";
import { Course } from "./course.model";
import { School } from "../school/school.model";

export default courseCrudControllers(Course, School);
