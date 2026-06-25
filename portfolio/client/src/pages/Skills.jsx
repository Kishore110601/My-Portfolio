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
        {
          _id: '1',
          category: 'ServiceNow Platform',
          skills: ['ITSM', 'CSM', 'Service Portal', 'App Engine Studio', 'Flow Designer', 'Integration Hub'],
        },
        {
          _id: '2',
          category: 'Automation & Intelligence',
          skills: ['Virtual Agent', 'Predictive Intelligence', 'Workflow Automation', 'Business Rules', 'UI Actions'],
        },
        {
          _id: '3',
          category: 'Integration & Data',
          skills: ['REST API', 'SOAP', 'Inbound/Outbound Integrations', 'Data Transformations', 'Platform Analytics'],
        },
        {
          _id: '4',
          category: 'Development',
          skills: ['JavaScript', 'Glide Scripting', 'HTML/CSS', 'UI Builder', 'Service Portal'],
        },
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

    </div>
  )
}
