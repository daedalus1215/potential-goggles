import mongoose from 'mongoose';

const validateIdParam = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id parameter' });
    }

    next();
};

export default validateIdParam;