import { useState, useEffect } from 'react'
import { pages } from '../../content/searchData'

const Search = () => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(query.toLowerCase())
  )

  // Manejar teclas de flecha y Enter
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prev) =>
        prev + 1 < filteredPages.length ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
    } else if (e.key === 'Enter') {
      // No redirigir si la consulta está vacía
      if (query.trim() === '') return

      // No redirigir si no hay coincidencias
      if (filteredPages.length === 0) return

      // Si se ha seleccionado un elemento, redirigir a ese,
      // de lo contrario, redirigir al primer elemento encontrado
      const page =
        selectedIndex >= 0 ? filteredPages[selectedIndex] : filteredPages[0]
      window.location.href = page.path
    }
  }

  // Resetear selección si la consulta cambia
  useEffect(() => {
    setSelectedIndex(-1)
  }, [query])

  return (
    <div className='w-full max-w-lg mx-auto relative'>
      <div className='relative'>
        <input
          type='text'
          placeholder='Buscar componente...'
          className='focus:outline-none w-full pl-10 p-2 border-0 shadow-sm rounded-md dark:shadow-neutral-100/20 backdrop-blur-md bg-neutral-100/30 dark:bg-zinc-700/40 text-zinc-800 dark:text-neutral-100'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 text-zinc-700/30 dark:text-neutral-100/40'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
      </div>

      {query && (
        <ul className='rounded-md absolute w-full backdrop-blur-lg bg-neutral-100/90 dark:bg-zinc-700/90 '>
          {filteredPages.map((page, index) => (
            <li
              key={page.path}
              className={`p-2 cursor-pointer rounded-md transition duration-300 ease-in-out ${
                index === selectedIndex
                  ? 'bg-cyan-800 text-neutral-100'
                  : 'hover:bg-cyan-200'
              }`}
              onClick={() => (window.location.href = page.path)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {page.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Search
