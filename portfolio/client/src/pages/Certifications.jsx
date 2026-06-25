import React from 'react'

const certificateModules = import.meta.glob('../assets/certificates/**/*.{png,pdf}', { eager: true, as: 'url' })

const certificates = Object.entries(certificateModules).reduce((acc, [filePath, url]) => {
  const fileName = filePath.split('/').pop()
  const category = filePath.includes('Mainline certificates')
    ? 'Mainline Certifications'
    : filePath.includes('Suite Certifications')
    ? 'Suite Certifications'
    : 'Micro Certifications'
  const title = fileName
    .replace(/\.(png|pdf)$/i, '')
    .replace(/Screenshot\s*\d+\s*/i, '')
    .replace(/[-_]/g, ' ')
    .trim()
  const extension = fileName.split('.').pop().toLowerCase()
  const type = extension === 'pdf' ? 'pdf' : 'image'

  // Only show PDF certificates across all certificate categories
  if (type !== 'pdf') return acc

  acc.push({
    id: fileName,
    category,
    title: title || 'Certificate',
    url,
    type,
  })
  return acc
}, [])

const groupedCertificates = certificates.reduce((groups, cert) => {
  if (!groups[cert.category]) groups[cert.category] = []
  groups[cert.category].push(cert)
  return groups
}, {})

export default function Certifications() {
  return (
    <div className="container py-20">
      <h1 className="text-5xl font-bold mb-6">Certifications & Credentials</h1>

      {Object.entries(groupedCertificates).map(([category, certs]) => (
        <div key={category} className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-semibold">{category}</h2>
              <p className="text-gray-500 dark:text-gray-400">{certs.length} certificates</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certs.map((cert) => (
              <div key={cert.id} className="bg-gray-100 dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                {cert.type === 'pdf' ? (
                  <div className="w-full h-72 bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-center p-6">
                    <iframe
                      src={cert.url}
                      title={cert.title}
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <img
                    src={cert.url}
                    alt={cert.title}
                    className="w-full h-72 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{cert.title}</h3>
                  {cert.type === 'pdf' && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                    >
                      View PDF
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
