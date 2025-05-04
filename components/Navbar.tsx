'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

const Navbar: React.FC = () => {
  const pathname: string = usePathname()

  const linkClass = (path: string): string =>
    `px-2 py-1 rounded-md transition-colors rounded-md ${
      pathname === path ? 'bg-neutral-200 text-neutral-700' : 'text-neutral-600'
    }`

  return (
    <nav className='flex items-center justify-between py-4'>

      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2'>
          <img src="logo.svg" alt="logoForNavbar" />
          <p className='font-medium text-base text-neutral-900'>Marşların Anlamı</p>
        </div>

        <span className='text-sm px-2 rounded-md text-neutral-600 bg-neutral-200'>v1</span>
      </div>

      <div className='flex items-center gap-4'>
        <a href="/" className={linkClass('/')}>Ana Sayfa</a>
        <a href="/marslar" className={linkClass('/marslar')}>Marşlar</a>
        <a href="/iletisim" className={linkClass('/iletisim')}>İletişim</a>
      </div>

    </nav>
  )
}

export default Navbar
