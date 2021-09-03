export const getSchool = model => async (req, res) => {
    try {
        const doc = await model
            .findOne({ name: (req.params.schoolName).toUpperCase() })
            .lean()
            .exec();

        if (!doc) {
            return res.status(404).end();
        }
        res.status(200).json({ data: doc });
    } catch (e) {
        console.error(e);
    }
}

export const getAllSchools = model => async (req, res) => {
    try {
        const docs = await model
            .find()
            .lean()
            .exec();
        res.status(200).json({ data: docs });
    } catch (e) {
        console.error(e);
    }
}

export const createSchool = model => async (req, res) => {
    try {
        const doc = await model.create({ name: req.body.name });
        return res.status(201).json({ data: doc });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const updateSchool = model => async (req, res) => {
    try {
        const updatedSchool = await model
            .findOneAndUpdate(
                {
                    name: (req.params.schoolName).toUpperCase()
                },
                req.body,
                { new: true }
            )
            .lean()
            .exec();

        if (!updatedSchool) {
            return res.status(400).end();
        }
        res.status(200).json({ data: updatedSchool });
    } catch (e) {
        console.error(e);
    }
}

export const removeSchool = model => async (req, res) => {
    try {
        const removedSchool = await model.findOneAndRemove({
            name: req.params.schoolName
        });

        if (!removedSchool) {
            return res.status(400).end();
        }

        return res.status(200).json({ data: removedSchool });
    } catch (e) {
        console.error(e);
    }
}

export const schoolCrudControllers = model => ({
    getSchool: getSchool(model),
    getAllSchools: getAllSchools(model),
    createSchool: createSchool(model),
    updateSchool: updateSchool(model),
    removeSchool: removeSchool(model)
});
