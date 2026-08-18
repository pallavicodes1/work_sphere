const Activity = require("../../../models/activity");
const get = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            page = 1,
            limit = 6,
        } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const activity = await Activity.find({ projectId: id })
            .skip(skip)
            .limit(limitNumber)
            .lean()
            .select("type message userId createdAt")
            .populate("userId", "name")
            .sort({ createdAt: -1 });
        const total = await Activity.countDocuments({
            projectId: id
        });

        const totalPages = Math.ceil(total / limitNumber);

        return res.status(200).json({
            activity,
            pagination: {
                page: pageNumber,
                limit: limitNumber,
                total,
                totalPages,
            },

        })
    } catch (error) {
        return res.status(500).json({
            message: `Server Error - ${error}`
        })
    }

}
module.exports = get;