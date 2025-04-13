'use client'
import React from 'react'
import { deployAction } from './deployAction'

const deployTrigger = () => {
  deployAction()
  alert(
    'Deployment triggered successfully. In about 5 minutes, the site will be updated. If it does not work, email joe at hello@joeholmes.dev',
  )
}

const HelloWorldButton: React.FC = () => {
  return (
    <button
      onClick={() => deployTrigger()}
      style={{
        padding: '8px 16px',
        borderRadius: '4px',
        background: '#0077ff',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      Deploy
    </button>
  )
}

export default HelloWorldButton
