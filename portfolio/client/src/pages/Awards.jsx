import React from 'react'

const awardModules = import.meta.glob('../assets/awards/*.pdf', { eager: true, as: 'url' })

const awards = Object.entries(awardModules).map(([filePath, url]) => {
  const fileName = filePath.split('/').pop()
  const title = fileName.replace(/\.pdf$/i, '').replace(/[-_]/g, ' ').trim()
  return {
    id: fileName,
    title,
    url,
  }
})

export default function Awards() {
  return (
    <div className="container py-20">
      <h1 className="text-5xl font-bold mb-12">Awards</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {awards.map((award) => (
          <div key={award.id} className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">{award.title}</h3>
            <div className="w-full h-72 bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-2xl mb-4">
              <iframe
                src={award.url}
                title={award.title}
                className="w-full h-full"
              />
            </div>
            <a
              href={award.url}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View Award PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
