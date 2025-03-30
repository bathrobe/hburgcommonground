import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <p>
          © {new Date().getFullYear()} <span className="md:hidden">HCG</span>
          <span className="hidden md:inline">Harrisonburg Common Ground</span>. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
