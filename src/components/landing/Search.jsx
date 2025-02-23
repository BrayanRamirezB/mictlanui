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
      <input
        type='text'
        placeholder='Buscar componente...'
        className='focus:outline-none w-full p-2 border-0 shadow-lg rounded-md dark:shadow-md dark:shadow-neutral-100/20 backdrop-blur-md bg-neutral-100/30 dark:bg-zinc-700/40 text-zinc-800 dark:text-neutral-100'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

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
