const User = require("../../models/user");

const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(200).json([]);
    }

    const search = q.trim();

    const users = await User.find({
      _id: { $ne: req.user._id },

      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    })
      .select("_id name email")
      .limit(10);

    return res.status(200).json(users);

  } catch (error) {
    console.error("Search users error:", error);

    return res.status(500).json({
      message: "Failed to search users",
    });
  }
};
module.exports=searchUsers;