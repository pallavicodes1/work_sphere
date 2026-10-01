const attachments = require('../../../models/attachments');
const get=  async (req, res) => {
  try {
    const attachment = await attachments.find({ project: req.params.id })
      .sort({ createdAt: -1 })
      .populate('uploadedBy', 'name email'); // optional, drop if you don't need uploader info

    res.json(attachment);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch attachments', error: err.message });
  }
}
module.exports=get;

