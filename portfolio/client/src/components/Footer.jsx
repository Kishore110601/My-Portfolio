import React from 'react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Portfolio</h3>
            <p className="text-gray-400">
              ServiceNow Developer with passion for creating scalable solutions
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/projects" className="hover:text-white transition">Projects</a></li>
              <li><a href="/certifications" className="hover:text-white transition">Certifications</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/Kishore110601" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                <FiGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/kishore-r11/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                <FiLinkedin size={24} />
              </a>
              <a href="mailto:kishorekishor39@gmail.com" className="hover:text-blue-400 transition">
                <FiMail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} ServiceNow Developer Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
