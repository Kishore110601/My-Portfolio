import express from 'express'
import Article from '../models/Article.js'

const router = express.Router()

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 })
    res.json(articles)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single article
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    if (!article) return res.status(404).json({ error: 'Article not found' })
    res.json(article)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create article
router.post('/', async (req, res) => {
  try {
    const article = new Article(req.body)
    await article.save()
    res.status(201).json(article)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update article
router.put('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!article) return res.status(404).json({ error: 'Article not found' })
    res.json(article)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete article
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id)
    if (!article) return res.status(404).json({ error: 'Article not found' })
    res.json({ message: 'Article deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
