import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="container py-20"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div className="text-center mb-20" variants={item}>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Hi, I'm a <span className="text-blue-500">ServiceNow Developer</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          ServiceNow developer at KeenStack focused on delivering ITSM and workflow automation solutions for enterprise teams.
        </p>
        <a
          href="https://www.linkedin.com/in/kishore-r11/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors"
        >
          <span>Get in Touch</span>
          <FiArrowRight />
        </a>
      </motion.div>

      {/* Stats */}
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20" variants={item}>
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
          <h3 className="text-4xl font-bold text-blue-500 mb-2">1+</h3>
          <p className="text-gray-600 dark:text-gray-400">Years of Experience</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
          <h3 className="text-4xl font-bold text-blue-500 mb-2">23</h3>
          <p className="text-gray-600 dark:text-gray-400">Certifications</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
          <h3 className="text-4xl font-bold text-blue-500 mb-2">2</h3>
          <p className="text-gray-600 dark:text-gray-400">Projects Completed</p>
        </div>
      </motion.div>

      {/* Featured Projects */}
      <motion.div className="mb-20" variants={item}>
        <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-4">Referral Management App</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Built a ServiceNow referral management application using AI-driven matching, automated approvals, and workflow orchestration over 6 months.
            </p>
            <Link
              to="/projects"
              className="text-blue-500 hover:text-blue-600 flex items-center space-x-2"
            >
              <span>View Details</span>
              <FiArrowRight />
            </Link>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-4">Kirkland ITSM Project</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Delivered the Kirkland ITSM implementation using ServiceNow ITSM modules, process automation, and incident management over 9 months.
            </p>
            <Link
              to="/projects"
              className="text-blue-500 hover:text-blue-600 flex items-center space-x-2"
            >
              <span>View Details</span>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </motion.div>

    </motion.div>
  )
}
