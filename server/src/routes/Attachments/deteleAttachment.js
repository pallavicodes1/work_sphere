const attachments = require("../../models/attachments");
const path=require('path');
const fs=require('fs/promises');
const deleteAttachments = async (req, res) => {
  try {
    const attachment = await attachments.findById(req.params.attachment);
    if (!attachment) {
      return res.status(404).json({ message: 'Attachment not found'});
    }

    await attachments.findByIdAndDelete(req.params.attachment);

    const filePath = path.join(__dirname, '../../..', 'uploads', attachment.fileName);
    
    await fs.unlink(filePath).catch((err) => {
        console.log(err);
    }); 

    res.json({ message: 'Attachment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Could not delete attachment', error: err.message });
  }
}
module.exports=deleteAttachments;