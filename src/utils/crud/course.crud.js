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
    //TODO:
}

export const removeCoursesByName = (courseModel, schoolModel) => async (req, res) => {
    //TODO:
}

//TODO: Must complete co-reqs and "oneOf" cases
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
        return res.status(200).json({ data: doc });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const updateCourse = (courseModel, schoolModel) => async (req, res) => {
    //TODO:
}

export const removeCourse = (courseModel, schoolModel) => async (req, res) => {
    //TODO:
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
    const fullName = courseRequisite.split(/[ ]+/);
    const courseName = fullName[0];
    const courseNumber = parseInt(fullName[1]);
    const doc = await courseModel
        .findOne({
            school: schoolId,
            name: courseName,
            number: courseNumber
        })
        .lean()
        .exec();
    for (let i = 0; i < doc.preRequisites.length; i++) {
        doc.preRequisites[i] = await getCourseHelper(courseModel, schoolModel)(schoolId, doc.preRequisites[i]);
    }
    return doc;
}
