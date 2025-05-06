import Tab from '@/components/react/Tabs/Tab.jsx'
import Tabs from '@/components/react/Tabs/Tabs.jsx'
import CodeBlock from '@/components/landing/CodeBlock'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark'

// Registrar solo el lenguaje necesario
SyntaxHighlighter.registerLanguage('jsx', jsx)

const CodeTabs = ({ tabs }) => {
  return (
    <div className='max-w-3xl w-auto mx-auto p-2'>
      <Tabs variant='light'>
        {tabs.map((tab) => (
          <Tab key={tab.label} label={tab.label}>
            <CodeBlock>
              <SyntaxHighlighter language='jsx' style={oneDark}>
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
