const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },       // name stored on disk
    originalName: { type: String, required: true },   // name the user uploaded
    fileUrl: { type: String, required: true },         // e.g. /uploads/171234-resume.pdf
    fileType: { type: String, required: true },        // mimetype, e.g. application/pdf
    fileSize: { type: Number, required: true },        // bytes
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'projects',
      required: true,
      index: true,
    },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attachment', attachmentSchema);
