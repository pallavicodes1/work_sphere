const Task = require('../../models/task');
const get = async (req, res) => {

    if (req?.query?.search) {
       
        const search = req?.query?.search;
        if (search?.trim() === "") {
            const result = await Task.find({ userId: req?.user?._id, isDeleted: false, project: null });
            if (result) {

                return res.send(result);
            }
        }
        const data = await Task.find({
            userId: req?.user?._id,
            isDeleted: false,
            project: null,
            $or: [
                {
                    title: {
                        $regex: search,
                        $options: 'i'
                    }
                }
            ]
        })

        return res.send(data);
    }
    else {
        
        const result = await Task.find({ userId: req?.user?._id, isDeleted: false, project:null });
        return res.status(200).json({
            tasks:result
        });
    }
}
module.exports = get;