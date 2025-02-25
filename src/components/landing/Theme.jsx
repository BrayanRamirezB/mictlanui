import { useEffect, useState } from 'react'

const Theme = () => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      return storedTheme
    }

    // Si no hay tema almacenado, usar la preferencia del sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }

    return 'light'
  })

  useEffect(() => {
    // Aplicar el tema al cargar o cambiar
    if (theme === 'dark') {
      document.querySelector('html').classList.add('dark')
    } else {
      document.querySelector('html').classList.remove('dark')
    }

    // Guardar el tema en localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const Icon =
    theme === 'dark' ? (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='icon icon-tabler icon-tabler-sun'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0' />
        <path d='M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7' />
      </svg>
    ) : (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='icon icon-tabler icon-tabler-moon-stars'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z' />
        <path d='M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2' />
        <path d='M19 11h2m-1 -1v2' />
      </svg>
    )

  return (
    <button
      onClick={handleChangeTheme}
      className='flex items-center justify-center size-6 transition duration-300 text-black dark:text-white/90 hover:text-[#0052D4] dark:hover:text-[#4364F7] hover:scale-110 active:animate-rotate-180'
    >
      {Icon}
    </button>
  )
}

export default Theme
