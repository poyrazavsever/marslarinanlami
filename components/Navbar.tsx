import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between py-4'>

        <div className='flex items-center gap-4'>

          <div className='flex items-center gap-2'>
            <img src="logo.svg" alt="logoForNavbar" />
            <p className='font-medium text-base text-neutral-900'>Marşların Anlamı</p>
          </div>

          <span className='text-sm px-2 rounded-md text-neutral-600 bg-neutral-200'>v1</span>

        </div>

        <div className='flex items-center gap-8 text-neutral-600'>
          <a href="/">Ana Sayfa</a>
          <a href="/marslar">Marşlar</a>
          <a href="/iletisim">İletişim</a>
        </div>

    </nav>
  )
}

export default Navbar