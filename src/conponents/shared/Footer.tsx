import React from 'react'
import { BsYoutube } from 'react-icons/bs'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
  <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="text-primary text-4xl font-semibold uppercase">
        Play Picker
      </div>

      <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
        <li>
          <a
            href="https://www.instagram.com/playpicker/"
            rel="noreferrer"
            target="_blank"
            className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
          >
            <span className="sr-only">Instagram</span>

            <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>

        <li>
          <a
            href="https://youtube.com/@playpickerltd?si=DV5gFEj2rei-Vlap"
            rel="noreferrer"
            target="_blank"
            className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
          >
            <span className="sr-only">Twitter</span>
            <BsYoutube className='size-6'/>

          </a>
        </li>


       
      </ul>
    </div>

    <div
      className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16 dark:border-gray-800"
    >
      <div>
        <p className="font-medium text-gray-900 dark:text-white">Services</p>

        <ul className="mt-6 space-y-4 text-sm">
          <li>
            <a href="/packages" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Recruitment Videos
            </a>
          </li>

          <li>
            <a href="/packages" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Player Highlight
            </a>
          </li>

          <li>
            <a href="/packages" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Match Highlight
            </a>
          </li>

          <li>
            <a href="/packages" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Highlight Reel
            </a>
          </li>

        </ul>
      </div>

      <div>
        <p className="font-medium text-gray-900 dark:text-white">Company</p>

        <ul className="mt-6 space-y-4 text-sm">
          <li>
            <a href="/about-us" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              About
            </a>
          </li>

          <li>
            <a href="/about-us" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Meet the Team
            </a>
          </li>

          
        </ul>
      </div>

      <div>
        <p className="font-medium text-gray-900 dark:text-white">Helpful Links</p>

        <ul className="mt-6 space-y-4 text-sm">
          <li>
            <a href="/contact" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Contact
            </a>
          </li>

          <li>
            <a href="#faq" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              FAQs
            </a>
          </li>

   
        </ul>
      </div>

      <div>
        <p className="font-medium text-gray-900 dark:text-white">Legal</p>

        <ul className="mt-6 space-y-4 text-sm">
          <li>
            <a  className= "cursor-pointer text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Accessibility
            </a>
          </li>

          <li>
            <a  className= "cursor-pointer text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Returns Policy
            </a>
          </li>

          <li>
            <a  className= "cursor-pointer text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Refund Policy
            </a>
          </li>

          <li>
            <a className="cursor-pointer text-gray-700 transition hover:opacity-75 dark:text-gray-200">
              Hiring-3 Statistics
            </a>
          </li>
        </ul>
      </div>
    </div>

    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
      &copy; 2026. Play Picker. All rights reserved.
    </p>
  </div>
</footer>

  )
}
