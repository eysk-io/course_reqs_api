export const getAllCourseReviews = (reviewModel, reviewIndexModel) => async (req, res) => {
    try {
        const reviewIndexDoc = await reviewIndexModel
            .findOne({
                subject: (req.params.subject).toUpperCase(),
                code: parseInt(req.params.courseCode)
            })
            .lean()
            .exec();
        if (!reviewIndexDoc) {
            return res.status(404).end();
        }
        const docs = await reviewModel
            .find({ courseId: reviewIndexDoc._id })
            .lean()
            .exec();
        return res.status(200).json({ data: docs });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const createCourseReview = (reviewModel, reviewIndexModel) => async (req, res) => {
    try {
        const reviewIndexDoc = await reviewIndexModel
            .findOne({
                subject: (req.params.subject).toUpperCase(),
                code: parseInt(req.params.courseCode)
            })
            .lean()
            .exec();
        if (!reviewIndexDoc) {
            return res.status(404).end();
        }
        req.body.courseId = reviewIndexDoc._id;
        const doc = await reviewModel.create({ ...req.body });
        return res.status(201).json({ data: doc });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const getCourseIndex = (reviewModel, reviewIndexModel) => async (req, res) => {
    try {
        const reviewIndexDoc = await reviewIndexModel
            .findOne({
                subject: (req.params.subject).toUpperCase(),
                code: parseInt(req.params.courseCode)
            })
            .lean()
            .exec();
        if (!reviewIndexDoc) {
            return res.status(404).end();
        }
        return res.status(200).json({ data: reviewIndexDoc });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const createCourseIndex = (reviewModel, reviewIndexModel) => async (req, res) => {
    try {
        const reviewIndexDoc = await reviewIndexModel
            .findOne({
                subject: (req.params.subject).toUpperCase(),
                code: parseInt(req.params.courseCode)
            })
            .lean()
            .exec();
        req.body.subject = req.params.subject.toUpperCase()
        req.body.code = parseInt(req.params.courseCode)
        if (!reviewIndexDoc) {
            const doc = await reviewIndexModel.create({ ...req.body });
            return res.status(201).json({ data: doc });
        } else {
            const doc = await reviewIndexModel.update({ ...req.body });
            return res.status(201).json({ data: doc });
        }
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const reviewCrudControllers = (reviewModel, reviewIndexModel) => ({
    getAllCourseReviews: getAllCourseReviews(reviewModel, reviewIndexModel),
    createCourseReview: createCourseReview(reviewModel, reviewIndexModel),
    createCourseIndex: createCourseIndex(reviewModel, reviewIndexModel),
    getCourseIndex: getCourseIndex(reviewModel, reviewIndexModel)
});
