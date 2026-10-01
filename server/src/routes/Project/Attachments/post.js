const multer=require('multer');
const upload = require('../../../config/multerconfig');
const attachments = require('../../../models/attachments');
const fs = require('fs/promises');


const post = async(req, res) => {
  const {id}=req.params;
  upload.single('file')(req, res, async (err) => {
    // Handle Multer-specific errors (file too large, wrong type, etc.)
    if (err instanceof multer.MulterError) {
  
      return res.status(400).json({ message: err.message });
    }
    if (err) {
      console.log(err)
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file was uploaded' });
    }

    try {
      const attachment = await attachments.create({
        fileName: req.file.filename,
        originalName: req.file.originalname,
        fileUrl: `/uploads/${req.file.filename}`,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        project: id,
        uploadedBy: req.user._id,
      });

      res.status(201).json(attachment);
    } catch (dbErr) {
      // If the DB write fails, clean up the file we already saved to disk
      // so we don't leave orphaned files behind.
      await fs.unlink(req.file.path).catch(() => {});
      res.status(500).json({ message: 'Could not save attachment', error: dbErr.message });
    }
  });
}
module.exports=post;