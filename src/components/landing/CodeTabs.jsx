import Tab from '@/components/react/Tabs/Tab.jsx'
import Tabs from '@/components/react/Tabs/Tabs.jsx'
import CodeBlock from '@/components/landing/CodeBlock'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark'

const CodeTabs = ({ tabs }) => {
  return (
    <div className='max-w-3xl w-auto mx-auto p-2'>
      <Tabs variant='light'>
        {tabs.map((tab) => (
          <Tab key={tab.label} label={tab.label}>
            <CodeBlock>
              <SyntaxHighlighter language='jsx' style={dark}>
                {tab.code}
              </SyntaxHighlighter>
            </CodeBlock>
          </Tab>
        ))}
      </Tabs>
    </div>
  )
}

export default CodeTabs
