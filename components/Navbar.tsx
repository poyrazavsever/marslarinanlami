'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { supabase } from '../lib/supabaseClient'

const Navbar: React.FC = () => {
  const pathname: string = usePathname()
  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const linkClass = (path: string): string =>
    `block px-4 py-2 rounded-md transition-colors text-base ${pathname === path
      ? 'bg-neutral-200 text-neutral-700'
      : 'text-neutral-600 hover:bg-neutral-100'
    }`

  return (
    <nav className="w-full">
      <div className="flex items-center justify-between py-4 px-2">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="logoForNavbar" className="h-8 w-8" />
          <p className="font-medium text-base text-neutral-900">Marşların Anlamı</p>
          <span className="text-xs px-2 rounded-md text-neutral-600 bg-neutral-200 ml-2">v1</span>
        </div>

        {/* Menü - büyük ekran */}
        <div className="hidden md:flex items-center gap-4">
          <a href="/" className={linkClass('/')}>Ana Sayfa</a>
          <a href="/marslar" className={linkClass('/marslar')}>Marşlar</a>
          {user ? (
            <a href="/mars-ekle" className={linkClass('/mars-ekle')}>Marş Ekle</a>
          ) : (
            <a href="/giris" className={linkClass('/giris')}>Giriş Yap</a>
          )}
        </div>

        {/* Burger Menü - küçük ekran */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 cursor-pointer"
          aria-label="Menüyü Aç"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block h-0.5 w-6 bg-neutral-800 rounded transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block h-0.5 w-6 bg-neutral-800 rounded my-1 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 w-6 bg-neutral-800 rounded transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Açılır Menü - küçük ekran */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-lg shadow-xl px-6 pt-8 transition-all duration-300">

          <button
            className="absolute top-3 right-3 text-neutral-500 text-5xl font-extralight hover:scale-105 transition-transform cursor-pointer"
            aria-label="Menüyü Kapat"
            onClick={() => setMenuOpen(false)}
          >
            &times;
          </button>

          <div className="flex flex-col items-start gap-6 mt-10">

            {/* Logo ve Başlık */}
            <div className="flex items-center gap-3 px-2">
              <img src="/logo.svg" alt="logoForNavbar" className="h-10 w-10" />
              <p className="text-lg font-medium text-neutral-900">Marşların Anlamı</p>
              <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-md w-fit mt-1">v1</span>
            </div>

            {/* Menü Linkleri */}
            <nav className="flex flex-col gap-4 text-lg w-full mt-6">

              <a href="/" className={`${linkClass('/')} hover:underline`} onClick={() => setMenuOpen(false)}>Ana Sayfa</a>

              <a href="/marslar" className={`${linkClass('/marslar')} hover:underline`} onClick={() => setMenuOpen(false)}>Marşlar</a>

              {user ? (
                <a href="/mars-ekle" className={`${linkClass('/mars-ekle')} hover:underline`} onClick={() => setMenuOpen(false)}>Marş Ekle</a>
              ) : (
                <a href="/giris" className={`${linkClass('/giris')} hover:underline`} onClick={() => setMenuOpen(false)}>Giriş Yap</a>
              )}
            </nav>
          </div>
        </div>
      )}

    </nav>
  )
}

export default Navbar
