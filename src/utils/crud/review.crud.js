export const getAllCourseReviews = (reviewModel, reviewIndexModel) => async (req, res) => {
    try {
        const reviewIndexDoc = await reviewIndexModel
            .findOne({
                reviewSubject: (req.params.subject).toUpperCase(),
                reviewCode: parseInt(req.params.courseCode)
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
                reviewSubject: (req.params.subject).toUpperCase(),
                reviewCode: parseInt(req.params.courseCode)
            })
            .lean()
            .exec();
        if (!reviewIndexDoc) {
            return res.status(404).end();
        }
        req.body.courseId = reviewIndexDoc._id;
        const doc = await reviewModel.create({ ...req.body });
        await reviewIndexModel.findOneAndUpdate({
            reviewSubject: (req.params.subject).toUpperCase(),
            reviewCode: parseInt(req.params.courseCode)
        }, {
            lastUpdatedDay: 3,
            lastUpdatedMonth: 11,
            lastUpdatedYear: 2021
        })
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
                reviewSubject: (req.params.subject).toUpperCase(),
                reviewCode: parseInt(req.params.courseCode)
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
                reviewSubject: (req.params.subject).toUpperCase(),
                reviewCode: parseInt(req.params.courseCode)
            })
            .lean()
            .exec();
        req.body.reviewSubject = req.params.subject.toUpperCase()
        req.body.reviewCode = parseInt(req.params.courseCode)
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