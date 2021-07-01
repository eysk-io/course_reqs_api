export const getAllCoursesBySchool = (courseModel, schoolModel) => async (req, res) => {
    try {
        const schoolDoc = await schoolModel
            .findOne({ name: req.params.school })
            .lean()
            .exec();
        if (!schoolDoc) {
            return res.status(404).end();
        }
        const docs = await courseModel
            .find({ school: schoolDoc._id })
            .lean()
            .exec();
        return res.status(200).json({ data: docs });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const createCourse = (courseModel, schoolModel) => async (req, res) => {
    try {
        const schoolDoc = await schoolModel
            .findOne({ name: req.params.school })
            .lean()
            .exec();
        if (!schoolDoc) {
            return res.status(404).end();
        }
        req.body.school = schoolDoc._id;
        const doc = await courseModel.create({ ...req.body });
        return res.status(201).json({ data: doc });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const getAllCoursesByName = (courseModel, schoolModel) => async (req, res) => {
    // TODO:
}

export const removeCoursesByName = (courseModel, schoolModel) => async (req, res) => {
    // TODO:
}

export const getCourse = (courseModel, schoolModel) => async (req, res) => {
    try {
        const schoolName = req.params.school;
        const courseName = req.params.courseName;
        const courseNumber = parseInt(req.params.courseNumber);
        const schoolDoc = await schoolModel
            .findOne({ name: schoolName })
            .lean()
            .exec();
        if (!schoolDoc) {
            return res.status(400).end();
        }
        const schoolId = schoolDoc._id
        const doc = await courseModel
            .findOne({
                school: schoolId,
                name: courseName,
                number: courseNumber
            })
            .lean()
            .exec();
        if (!doc) {
            return res.status(400).end();
        }
        for (let i = 0; i < doc.preRequisites.length; i++) {
            doc.preRequisites[i] = await getCourseHelper(courseModel, schoolModel)(schoolId, doc.preRequisites[i]);
        }
        for (let i = 0; i < doc.coRequisites.length; i++) {
            doc.coRequisites[i] = await getCourseHelper(courseModel, schoolModel)(schoolId, doc.coRequisites[i]);
        }
        return res.status(200).json({ data: doc });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const updateCourse = (courseModel, schoolModel) => async (req, res) => {
    try {
        const schoolName = req.params.school;
        const schoolDoc = await schoolModel
            .findOne({ name: schoolName })
            .lean()
            .exec();
        if (!schoolDoc) {
            return res.status(400).end();
        }
        const schoolId = schoolDoc._id;
        const courseName = req.params.courseName;
        const courseNumber = req.params.courseNumber;
        const doc = await courseModel
            .findOneAndUpdate({
                school: schoolId,
                name: courseName,
                number: courseNumber
            }, { ...req.body }
            )
            .lean()
            .exec();
        if (!doc) {
            return res.status(400).end();
        }
        return res.status(200).json({ data: doc });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const removeCourse = (courseModel, schoolModel) => async (req, res) => {
    // TODO:
}

export const courseCrudControllers = (courseModel, schoolModel) => ({
    getAllCoursesBySchool: getAllCoursesBySchool(courseModel, schoolModel),
    createCourse: createCourse(courseModel, schoolModel),
    getAllCoursesByName: getAllCoursesByName(courseModel, schoolModel),
    removeCoursesByName: removeCoursesByName(courseModel, schoolModel),
    getCourse: getCourse(courseModel, schoolModel),
    updateCourse: updateCourse(courseModel, schoolModel),
    removeCourse: removeCourse(courseModel, schoolModel),
});

const getCourseHelper = (courseModel, schoolModel) => async (schoolId, courseRequisite) => {
    if (typeof (courseRequisite) !== "string") {
        let courseObj = {};
        if (Object.keys(courseRequisite).includes("oneOf")) {
            let oneOfListLength = courseRequisite.oneOf.length
            courseObj.oneOf = [];
            for (let i = 0; i < oneOfListLength; i++) {
                courseObj.oneOf[i] = await getCourseHelper(courseModel, schoolModel)(schoolId, courseRequisite.oneOf[i]);
            }
        }
        if (
            Object.keys(courseRequisite).includes("scoreOf") &&
            Object.keys(courseRequisite).includes("metric") &&
            Object.keys(courseRequisite).includes("courses")
        ) {
            let numCourses = courseRequisite.courses.length;
            courseObj = {
                scoreOf: courseRequisite.scoreOf,
                metric: courseRequisite.metric,
                courses: []
            };
            for (let i = 0; i < numCourses; i++) {
                courseObj.courses[i] = await getCourseHelper(courseModel, schoolModel)(schoolId, courseRequisite.courses[i]);
            }
        }
        if (Object.keys(courseRequisite).includes("advancedCredit")) {
            let numCourses = courseRequisite.advancedCredit.length;
            courseObj = {
                advancedCredit: []
            };
            for (let i = 0; i < numCourses; i++) {
                courseObj.advancedCredit[i] = await getCourseHelper(courseModel, schoolModel)(schoolId, courseRequisite.advancedCredit[i]);
            }
        }
        return courseObj;
    }
    const fullName = courseRequisite.split(/[ ]+/);
    const courseName = fullName[0];
    let doc;
    if (
        !isNaN(fullName[1]) &&
        !isNaN(parseFloat(fullName[1]))
    ) {
        const courseNumber = parseInt(fullName[1]);
        doc = await courseModel
            .findOne({
                school: schoolId,
                name: courseName,
                number: courseNumber
            })
            .lean()
            .exec();
    }
    if (!doc) {
        let courseObj = {
            _id: "-1",
            preRequisites: [],
            coRequisites: [],
            name: courseRequisite,
            number: -1,
            credits: 0,
            school: schoolId,
            __v: 0
        }
        return courseObj;
    }
    for (let i = 0; i < doc.preRequisites.length; i++) {
        doc.preRequisites[i] = await getCourseHelper(courseModel, schoolModel)(schoolId, doc.preRequisites[i]);
    }
    for (let i = 0; i < doc.coRequisites.length; i++) {
        doc.coRequisites[i] = await getCourseHelper(courseModel, schoolModel)(schoolId, doc.coRequisites[i]);
    }
    return doc;
}
