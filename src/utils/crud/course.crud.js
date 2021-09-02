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
            .find({ school: schoolDoc.name })
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
        req.body.school = schoolDoc.name;
        const doc = await courseModel.create({ ...req.body });
        return res.status(201).json({ data: doc });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const getAllCoursesBySchoolAndSubject = (courseModel, schoolModel) => async (req, res) => {
    try {
        const schoolName = req.params.school;
        const subject = req.params.subject;
        const schoolDoc = await schoolModel
            .findOne({ name: schoolName })
            .lean()
            .exec();
        if (!schoolDoc) {
            return res.status(404).end();
        }
        const schoolId = schoolDoc.name
        const doc = await courseModel
            .find({
                school: schoolId,
                subject: subject
            })
            .lean()
            .exec();
        if (!doc) {
            return res.status(404).end();
        }
        return res.status(200).json({ data: doc });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const removeAllCoursesBySchoolAndSubject = (courseModel, schoolModel) => async (req, res) => {
    try {
        const schoolName = req.params.school;
        const subject = req.params.subject;
        const schoolDoc = await schoolModel
            .findOne({ name: schoolName })
            .lean()
            .exec();
        if (!schoolDoc) {
            return res.status(404).end();
        }
        const schoolId = schoolDoc.name
        const doc = await courseModel
            .remove({
                school: schoolId,
                subject: subject
            })
            .lean()
            .exec();
        if (!doc) {
            return res.status(404).end();
        }
        return res.status(200).json({ data: doc });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const getCourse = (courseModel, schoolModel) => async (req, res) => {
    try {
        const schoolName = req.params.school;
        const subject = req.params.subject;
        const courseCode = parseInt(req.params.courseCode);
        const schoolDoc = await schoolModel
            .findOne({ name: schoolName })
            .lean()
            .exec();
        if (!schoolDoc) {
            return res.status(400).end();
        }
        const schoolId = schoolDoc.name
        const doc = await courseModel
            .findOne({
                school: schoolId,
                subject: subject,
                code: courseCode
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
        for (let i = 0; i < doc.equivalencies.length; i++) {
            doc.equivalencies[i] = await getCourseHelper(courseModel, schoolModel)(schoolId, doc.equivalencies[i]);
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
        const schoolId = schoolDoc.name;
        const subject = req.params.subject;
        const courseCode = req.params.courseCode;
        const doc = await courseModel
            .findOneAndUpdate({
                school: schoolId,
                subject: subject,
                code: courseCode
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
    try {
        const schoolName = req.params.school;
        const schoolDoc = await schoolModel
            .findOne({ name: schoolName })
            .lean()
            .exec();
        if (!schoolDoc) {
            return res.status(400).end();
        }
        const schoolId = schoolDoc.name;
        const subject = req.params.subject;
        const courseCode = req.params.courseCode;
        const removedCourse = await courseModel
            .findOneAndRemove({
                school: schoolId,
                subject: subject,
                code: courseCode
            })
            .lean()
            .exec();
        if (!removedCourse) {
            return res.status(400).end();
        }
        return res.status(200).json({ data: removedCourse });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const courseCrudControllers = (courseModel, schoolModel) => ({
    getAllCoursesBySchool: getAllCoursesBySchool(courseModel, schoolModel),
    createCourse: createCourse(courseModel, schoolModel),
    getAllCoursesBySchoolAndSubject: getAllCoursesBySchoolAndSubject(courseModel, schoolModel),
    removeAllCoursesBySchoolAndSubject: removeAllCoursesBySchoolAndSubject(courseModel, schoolModel),
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
        if (Object.keys(courseRequisite).includes("recommended")) {
            let numCourses = courseRequisite.recommended.length;
            courseObj = {
                recommended: []
            };
            for (let i = 0; i < numCourses; i++) {
                courseObj.recommended[i] = await getCourseHelper(courseModel, schoolModel)(schoolId, courseRequisite.recommended[i]);
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
    const subject = fullName[0];
    let doc;
    if (
        !isNaN(fullName[1]) &&
        !isNaN(parseFloat(fullName[1]))
    ) {
        const courseCode = parseInt(fullName[1]);
        doc = await courseModel
            .findOne({
                school: schoolId,
                subject: subject,
                code: courseCode
            })
            .lean()
            .exec();
    }
    if (!doc) {
        let courseObj = {
            _id: "",
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            subject: "",
            description: "",
            title: courseRequisite,
            code: -1,
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
    for (let i = 0; i < doc.equivalencies.length; i++) {
        doc.equivalencies[i] = await getCourseHelper(courseModel, schoolModel)(schoolId, doc.equivalencies[i]);
    }
    return doc;
}
