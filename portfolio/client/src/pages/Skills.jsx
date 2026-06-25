import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Skills() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await axios.get('/api/skills')
      setSkills(response.data)
    } catch (error) {
      console.error('Error fetching skills:', error)
      // Fallback to sample data
      setSkills([
        { _id: '1', category: 'ServiceNow', skills: ['Admin', 'Developer', 'Configuration', 'Scripting'] },
        { _id: '2', category: 'Programming', skills: ['JavaScript', 'Python', 'Java', 'SQL'] },
        { _id: '3', category: 'Web Technologies', skills: ['REST API', 'HTML/CSS', 'React', 'Node.js'] },
        { _id: '4', category: 'Databases', skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Oracle'] },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container py-20 text-center">Loading skills...</div>
  }

  return (
    <div className="container py-20">
      <h1 className="text-5xl font-bold mb-12">Skills & Expertise</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skillGroup) => (
          <div
            key={skillGroup._id}
            className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-blue-500">{skillGroup.category}</h3>
            <div className="flex flex-wrap gap-3">
              {skillGroup.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Awards moved to a dedicated page */}

      <div className="mt-16 bg-blue-500 text-white p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Collaborate?</h2>
        <p className="text-lg mb-6">Let's leverage these skills to build something amazing together</p>
        <a
          href="mailto:kishorekishor39@gmail.com?subject=connection%20request"
          className="inline-block bg-white text-blue-500 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
        >
          Get in Touch
        </a>
      </div>
    </div>
  )
}
