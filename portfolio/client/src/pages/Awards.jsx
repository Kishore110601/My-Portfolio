import React from 'react'

export default function Awards() {
  const awards = [
    {
      id: 'a1',
      title: 'ServiceNow Certification Achiever',
      desc: 'Recognized for completing multiple ServiceNow certifications.',
    },
    {
      id: 'a2',
      title: 'Excellence in Automation',
      desc: 'Awarded for implementing automation solutions that improved efficiency.',
    },
  ]

  return (
    <div className="container py-20">
      <h1 className="text-5xl font-bold mb-12">Awards</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {awards.map((award) => (
          <div key={award.id} className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">{award.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{award.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
