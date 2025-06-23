import React from 'react'

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 pb-8 px-4 w-full">

      <div className="flex w-full items-center justify-center gap-4 self-end sm:self-center">

        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="logoForNavbar" className="h-7 w-7 dark:invert" />
          <p className="font-medium text-base text-neutral-900 dark:text-neutral-100">Marşların Anlamı</p>
        </div>
        <span className="text-sm px-2 rounded-md text-neutral-600 bg-neutral-200 dark:text-neutral-300 dark:bg-neutral-800">v1</span>
      </div>

      <div className="w-full flex flex-col sm:flex-row items-center justify-between text-sm gap-2 sm:gap-0">
        <p className="text-normal text-neutral-600 text-center sm:text-left">
          Bu proje açık kaynak kodludur, katkıda bulunmak için{' '}
          <a
            href="https://github.com/poyrazavsever/marslarinanlami"
            target="_blank"
            className="text-neutral-800 underline hover:text-neutral-950 transition-all"
            rel="noopener noreferrer"
          >
            bu adresi
          </a>{' '}
          ziyaret edebilirsiniz.
        </p>
        <p className="text-normal text-neutral-600 text-center sm:text-right">
          <a
            href="https://www.pavsever.com"
            target="_blank"
            className="text-neutral-800 underline hover:text-neutral-950 transition-all"
            rel="noopener noreferrer"
          >
            Poyraz Avsever
          </a>{' '}
          tarafından oluşturuldu.
        </p>
      </div>

    </footer>
  )
}

export default Footer