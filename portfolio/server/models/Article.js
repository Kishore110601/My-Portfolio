import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    excerpt: String,
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: 'ServiceNow Developer',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    readTime: Number,
    tags: [String],
  },
  { timestamps: true }
)

export default mongoose.model('Article', articleSchema)
