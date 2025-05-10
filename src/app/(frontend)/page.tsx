import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-100 to-slate-200">
        <div className="container mx-auto text-center py-16 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Finding Common Ground</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Bridging divides through respectful dialogue, shared values, and collaborative solutions
            to strengthen our democracy.
          </p>
          <Link
            href="/contact"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg text-lg inline-block"
          >
            Join Our Community
          </Link>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Our Mission</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed mb-6">
              Harrisonburg Common Ground brings together diverse citizens across the political
              spectrum who share a commitment to revitalizing American democracy through respectful
              dialogue and collaboration.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              In a time of heightened polarization, we believe that by listening to each other,
              identifying our shared values, and working toward pragmatic compromises, we can
              contribute to rebuilding our democratic institutions and civic culture.
            </p>
            <p className="text-lg leading-relaxed">
              We don't expect to agree on everything—in fact, we value our differences. What unites
              us is the conviction that thoughtful citizens can find common ground through
              good-faith engagement and a shared commitment to democratic principles.
            </p>
          </div>
        </div>
      </section>

      {/* Content Areas Section */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore What We Offer</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Blog Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="h-48 bg-emerald-100 flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-emerald-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"></path>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Perspectives & Op-Eds</h3>
                <p className="text-gray-600 mb-4">
                  Read thoughtful opinions from across the political spectrum published in various
                  newspapers and media outlets.
                </p>
                <Link
                  href="/blog"
                  className="text-emerald-600 font-semibold hover:text-emerald-800"
                >
                  Read our perspectives →
                </Link>
              </div>
            </div>

            {/* Events Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="h-48 bg-indigo-100 flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-indigo-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z"></path>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Events & Discussions</h3>
                <p className="text-gray-600 mb-4">
                  Join our meetings, open discussions, and community events where we practice civil
                  dialogue and explore solutions.
                </p>
                <Link
                  href="/events"
                  className="text-indigo-600 font-semibold hover:text-indigo-800"
                >
                  Find an event →
                </Link>
              </div>
            </div>

            {/* FAQs Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="h-48 bg-amber-100 flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-amber-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Resources & Guides</h3>
                <p className="text-gray-600 mb-4">
                  Access resources on conducting civil conversations, effective research methods,
                  writing fact-checked op-eds, and more.
                </p>
                <Link href="/faq" className="text-amber-600 font-semibold hover:text-amber-800">
                  Browse resources →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
