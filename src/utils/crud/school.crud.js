export const getSchool = model => async (req, res) => {
    const schoolName = req.params.name;
    try {
        const doc = await model
            .findOne({ name: schoolName })
            .lean()
            .exec();

        if (!doc) {
            return res.status(404).end();
        }
        res.status(200).json({ data: doc });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const getAllSchools = model => async (req, res) => {
    try {
        const docs = await model
            .find({})
            .lean()
            .exec();
        res.status(200).json({ data: docs });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const createSchool = model => async (req, res) => {
    try {
        const doc = await model.create({ ...req.body });
        res.status(201).json({ data: doc });
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
                    _id: req.params.id
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
        res.status(400).send();
    }
}

export const removeSchool = model => async (req, res) => {
    try {
        const removedSchool = await model.findOneAndRemove({
            name: req.params.name
        });

        if (!removedSchool) {
            return res.status(400).end();
        }

        return res.status(200).json({ data: removedSchool });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const schoolCrudControllers = model => ({
    getSchool: getSchool(model),
    getAllSchools: getAllSchools(model),
    createSchool: createSchool(model),
    updateSchool: updateSchool(model),
    removeSchool: removeSchool(model)
});