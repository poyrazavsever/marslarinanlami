import React from 'react'

const Footer = () => {
  return (
    <footer className='flex flex-col items-end gap-4 pb-8'>

      <div className='flex items-center gap-4'>

        <div className='flex items-center gap-2'>
          <img src="logo.svg" alt="logoForNavbar" />
          <p className='font-medium text-base text-neutral-900'>Marşların Anlamı</p>
        </div>

        <span className='text-sm px-2 rounded-md text-neutral-600 bg-neutral-200'>v1</span>

      </div>


      <div className='w-full flex items-center justify-between text-sm'>

        <p className='text-normal text-neutral-600'>Bu proje açık kaynak kodludur, katkıda bulunmak için <a href="https://github.com/poyrazavsever/marslarinanlami" target='_blank' className='text-neutral-800 underline pointer hover:text-neutral-950 transition-all'>bu adresi</a> ziyaret edebilirsiniz.</p>

        <p className='text-normal text-neutral-600'><a href="https://www.pavsever.com" target='_blank' className='text-neutral-800 underline pointer hover:text-neutral-950 transition-all'>Poyraz Avsever</a> tarafından oluşturuldu.</p>

      </div>

    </footer>
  )
}

export default Footer