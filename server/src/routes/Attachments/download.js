const attachments = require("../../models/attachments");
const path=require('path');
const download = async (req, res) => {
  try {
    const attachment = await attachments.findById(req.params.attachment);
    if (!attachment) {
      console.log(object)
      return res.status(404).json({ message: 'Attachment not found' });
    }

    const filePath = path.join(__dirname, '../../../', 'uploads', attachment.fileName);

    // res.download sets Content-Disposition: attachment with the given
    // filename and streams the file; it 404s cleanly if the file is missing.
    res.download(filePath, attachment.originalName, (err) => {
      if (err && !res.headersSent) {
        res.status(404).json({ message: 'File not found on server' });
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not download attachment', error: err.message });
  }
}
module.exports=download