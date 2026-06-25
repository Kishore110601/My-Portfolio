import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    skills: [String],
    proficiency: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Intermediate',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Skill', skillSchema)
