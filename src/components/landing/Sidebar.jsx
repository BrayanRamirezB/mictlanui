import { useState, useEffect } from 'react'

const Sidebar = ({ components, overview, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false)

  const ordenPersonalizado = [
    'Introducción',
    'Principios de diseño',
    'Empezando'
  ]

  // Guardar la posición del scroll en el localStorage
  const saveScrollPosition = () => {
    const sidebar = document.querySelector('.sidebar-content')
    if (sidebar) {
      localStorage.setItem('sidebarScrollPosition', sidebar.scrollTop)
    }
  }

  // Restaurar la posición del scroll al montar el componente
  useEffect(() => {
    const savedPosition = localStorage.getItem('sidebarScrollPosition')
    const sidebar = document.querySelector('.sidebar-content')
    if (sidebar && savedPosition) {
      sidebar.scrollTop = parseInt(savedPosition, 10)
    }

    // Limpiar el localStorage cuando el componente se desmonte
    return () => {
      saveScrollPosition()
    }
  }, [])

  // Manejar el evento de scroll
  const handleScroll = (e) => {
    saveScrollPosition()
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='inline-flex items-center p-3 m-3 text-sm transition-transform duration-300 hover:-translate-y-1 gap-x-2 backdrop-blur-md shadow-xl text-gray-700 rounded-lg lg:hidden hover:bg-gray-100 hover:text-[#0052D4] focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-300  dark:hover:bg-gray-700 dark:focus:ring-gray-600 '
        aria-label='Abrir menú'
      >
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
          className='icon icon-tabler icons-tabler-outline icon-tabler-menu-2'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M4 6l16 0' />
          <path d='M4 12l16 0' />
          <path d='M4 18l16 0' />
        </svg>
        {isOpen ? 'Cerrar' : 'Menú'}
      </button>

      <aside
        className={`fixed top-0 lg:top-auto left-0 z-40 lg:z-0 w-56 lg:h-7/8 h-full autotransform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform lg:translate-x-0`}
      >
        <div
          className='sidebar-content h-full overflow-y-auto scrollbar-hidden px-3 py-4 backdrop-blur-sm border-gray-200 bg-black/5 dark:bg-white/5 lg:border-none lg:bg-transparent lg:dark:bg-transparent'
          onScroll={handleScroll}
        >
          <ul className='space-y-4 font-medium'>
            <li className='py-1'>
              <h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-white'>
                Introducción
              </h3>
              <ul className='pl-4 space-y-1'>
                {overview
                  .sort((a, b) => {
                    const indexA = ordenPersonalizado.indexOf(a.data.name)
                    const indexB = ordenPersonalizado.indexOf(b.data.name)

                    // Si un elemento no está en el orden personalizado, se coloca al final
                    if (indexA === -1) return 1
                    if (indexB === -1) return -1

                    return indexA - indexB
                  })
                  .map((over) => {
                    const { slug, data } = over
                    const { name } = data

                    return (
                      <li key={slug} className='mb-1'>
                        <a
                          href={`/overview/${slug}`}
                          className={`flex text-sm items-center px-2 py-1.5 rounded-lg transition duration-300  group ${
                            currentPath === `/overview/${slug}/`
                              ? 'bg-gray-300/50 dark:bg-zinc-700/30 text-[#0052D4] dark:text-[#4364F7]'
                              : 'text-gray-600 dark:text-gray-300 hover:text-[#0052D4] dark:hover:text-[#4364F7] hover:bg-gray-300/50 dark:hover:bg-zinc-700/30'
                          }`}
                        >
                          {name}
                        </a>
                      </li>
                    )
                  })}
              </ul>
            </li>

            <li className='py-1'>
              <h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-white'>
                Componentes
              </h3>
              <ul className='pl-4 space-y-1'>
                {components
                  .sort((a, b) => a.data.name.localeCompare(b.data.name))
                  .map((component) => {
                    const { slug, data } = component
                    const { name } = data

                    return (
                      <li key={slug} className='mb-1'>
                        <a
                          href={`/components/${slug}`}
                          className={`flex text-sm items-center px-2 py-1.5 rounded-lg  transition duration-300  group ${
                            currentPath === `/components/${slug}/`
                              ? 'text-[#0052D4] dark:text-[#4364F7] bg-gray-300/50 dark:bg-zinc-700/30'
                              : 'text-gray-600 dark:text-gray-300 hover:text-[#0052D4] dark:hover:text-[#4364F7] hover:bg-gray-300/50 dark:hover:bg-zinc-700/30'
                          }`}
                        >
                          {name}
                        </a>
                      </li>
                    )
                  })}
              </ul>
            </li>
          </ul>
        </div>
      </aside>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className='fixed inset-0 z-30 bg-neutral-100/40 dark:bg-black/50 lg:hidden'
        ></div>
      )}
    </>
  )
}

export default Sidebar
