import { useMemo } from 'react'
import Tab from '@/components/react/Tabs/Tab.jsx'
import Tabs from '@/components/react/Tabs/Tabs.jsx'
import CodeBlock from '@/components/landing/CodeBlock'
import { highlightOneDark } from '@/utils/highlight'

const CodeTabs = ({ tabs }) => {
  const highlightedTabs = useMemo(() => {
    return tabs.map((tab) => ({
      ...tab,
      highlightedCode: highlightOneDark(tab.code)
    }))
  }, [tabs])

  return (
    <div className='max-w-3xl w-auto mx-auto p-2 not-prose'>
      <Tabs variant='light'>
        {highlightedTabs.map((tab) => (
          <Tab key={tab.label} label={tab.label}>
            <CodeBlock>
              <pre
                className='p-4 rounded-md overflow-auto'
                aria-label={`Code snippet for ${tab.label}`}
                role='region'
              >
                <code
                  className='font-mono'
                  dangerouslySetInnerHTML={{
                    __html: tab.highlightedCode
                  }}
                ></code>
              </pre>
            </CodeBlock>
          </Tab>
        ))}
      </Tabs>
    </div>
  )
}

export default CodeTabs
