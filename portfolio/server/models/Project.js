import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: String,
    technologies: [String],
    link: String,
    github: String,
    image: String,
  },
  { timestamps: true }
)

export default mongoose.model('Project', projectSchema)
