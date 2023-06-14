import Link from 'next/link'
import React from 'react'
import ThemeSwitch from '@components/ThemeSwitch'
import { useRouter } from 'next/router'

const Navigation = () => {
  const { pathname } = useRouter()
  return (
    <div className="sticky top-0 z-20 bg-white py-2 dark:bg-black md:mb-6 md:py-6">
      <div className="container mx-auto flex items-center justify-between px-4 lg:max-w-4xl">
        <div className="flex items-start">
          <Link legacyBehavior href="/">
            <a
              className={
                'font-medium uppercase tracking-wider text-gray-900 transition-colors hover:text-sky-500 dark:text-white dark:hover:text-sky-500'
              }
            >
              Kingsley Obot
            </a>
          </Link>
        </div>
        <div className="flex items-end space-x-5">
          <Link legacyBehavior href="/">
            <a
              className={
                pathname === '/'
                  ? 'font-medium uppercase tracking-wider text-sky-500 transition-colors hover:text-sky-500 dark:text-sky-500 dark:text-white'
                  : 'font-medium uppercase tracking-wider text-gray-900 transition-colors hover:text-sky-500 dark:text-white dark:hover:text-sky-500'
              }
            >
              About
            </a>
          </Link>
          <Link legacyBehavior href={'/blog'}>
            <a
              className={
                pathname === '/blog'
                  ? 'font-medium uppercase tracking-wider text-sky-500 transition-colors hover:text-sky-500 dark:text-sky-500 dark:text-white'
                  : 'font-medium uppercase tracking-wider text-gray-900 transition-colors hover:text-sky-500 dark:text-white dark:hover:text-sky-500'
              }
            >
              Blog
            </a>
          </Link>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  )
}

export default Navigation
