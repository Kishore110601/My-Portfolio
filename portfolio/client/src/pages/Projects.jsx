import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects')
      setProjects(response.data)
    } catch (error) {
      console.error('Error fetching projects:', error)
      // Fallback to sample data
      setProjects([
        {
          _id: '1',
          title: 'Referral Management App',
          description: 'Built a ServiceNow referral management app using AI-driven matching, automated approvals, and workflow orchestration over 6 months.',
          technologies: ['ServiceNow', 'AI', 'Integration Hub', 'Scripting'],
          link: '#',
          github: '#',
        },
        {
          _id: '2',
          title: 'Kirkland ITSM Project',
          description: 'Delivered the Kirkland ITSM implementation with incident, problem, and change management using ServiceNow ITSM modules for 9 months.',
          technologies: ['ServiceNow ITSM', 'Service Portal', 'Automation', 'Reporting'],
          link: '#',
          github: '#',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container py-20 text-center">Loading projects...</div>
  }

  return (
    <div className="container py-20">
      <h1 className="text-5xl font-bold mb-12">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg hover:shadow-lg transition-shadow"
          >
            <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>

            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
