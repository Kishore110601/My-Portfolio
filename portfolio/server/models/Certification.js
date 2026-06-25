import mongoose from 'mongoose'

const certificationSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ['Mainline Certifications', 'Micro Certifications', 'Other'],
      default: 'Other',
    },
    title: {
      type: String,
      required: true,
    },
    issuer: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    credentialUrl: String,
    credentialId: String,
  },
  { timestamps: true }
)

export default mongoose.model('Certification', certificationSchema)
