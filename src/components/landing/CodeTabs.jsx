import React, { useMemo } from 'react'
import Tab from '@/components/react/Tabs/Tab.jsx'
import Tabs from '@/components/react/Tabs/Tabs.jsx'
import CodeBlock from '@/components/landing/CodeBlock'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/atom-one-dark.min.css'

if (!hljs.getLanguage('javascript')) {
  hljs.registerLanguage('javascript', javascript)
}

const CodeTabs = React.memo(({ tabs }) => {
  const highlights = useMemo(() => {
    return tabs.map(({ label, code }) => {
      const html = hljs.highlight(code, { language: 'javascript' }).value
      return { label, html }
    })
  }, [tabs])

  return (
    <div className='max-w-3xl w-auto mx-auto p-2 not-prose'>
      <Tabs variant='light'>
        {highlights.map(({ label, html }) => (
          <Tab key={label} label={label}>
            <CodeBlock>
              <pre className='rounded-md overflow-auto p-4 text-sm'>
                <code
                  className='language-javascript'
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </pre>
            </CodeBlock>
          </Tab>
        ))}
      </Tabs>
    </div>
  )
})

export default CodeTabs
