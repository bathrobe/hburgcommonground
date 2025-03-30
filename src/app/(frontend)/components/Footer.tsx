import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <p>© {new Date().getFullYear()} My Site. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
