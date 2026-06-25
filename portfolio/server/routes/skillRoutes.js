import express from 'express'
import Skill from '../models/Skill.js'

const router = express.Router()

// Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find()
    res.json(skills)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single skill category
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id)
    if (!skill) return res.status(404).json({ error: 'Skill not found' })
    res.json(skill)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create skill category
router.post('/', async (req, res) => {
  try {
    const skill = new Skill(req.body)
    await skill.save()
    res.status(201).json(skill)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update skill
router.put('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!skill) return res.status(404).json({ error: 'Skill not found' })
    res.json(skill)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete skill
router.delete('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id)
    if (!skill) return res.status(404).json({ error: 'Skill not found' })
    res.json({ message: 'Skill deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
