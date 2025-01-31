import { useState, useRef } from 'react'

const CodeBlock = ({ children }) => {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef(null)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeRef.current.textContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error('Error copying text:', err)
    }
  }

  return (
    <div className='text-sm max-w-3xl w-auto mx-auto p-2 not-prose'>
      <div
        ref={codeRef}
        className='rounded-lg p-3 shadow-xl backdrop-blur-xl text-gray-100 bg-black/80 dark:bg-black/60'
      >
        {children}
        <button
          onClick={handleCopy}
          className='absolute end-2 top-1 right-1 transition duration-300 dark:text-gray-300 text-gray-400 dark:hover:bg-white/20 dark:hover:text-gray-100 hover:text-gray-100 hover:bg-black/20 rounded-lg p-2 inline-flex items-center justify-center'
        >
          {copied ? (
            <span className='inline-flex items-center'>
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
                className='size-4 text-blue-500 '
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path stroke='none' d='M0 0h24v24H0z' />
                <path d='M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z' />
                <path d='M4.012 16.737a2 2 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1' />
                <path d='M11 14l2 2l4 -4' />
              </svg>
            </span>
          ) : (
            <span className='inline-flex items-center'>
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
                className='size-4'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z' />
                <path d='M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1' />
              </svg>
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

export default CodeBlock
