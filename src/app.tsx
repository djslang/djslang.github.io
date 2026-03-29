import { useEffect, useState } from 'preact/hooks'
import * as prettier from 'prettier/standalone'
import * as prettierPluginBabel from 'prettier/plugins/babel'
import * as prettierPluginEstree from 'prettier/plugins/estree'

const examples = [
  { title: 'Manual or pick an example:', code: '' },
  {
    title: 'Database',
    code: `let sqlite = require('better-sqlite3')

(function main() {
  let db = sqlite('mydata.db') or |err| {
    console.log('Cannot connect to database', err)
    return
  }
  defer db.close()

  // prepare and execute queries
  let stmt = db.prepare('SELECT * FROM users WHERE active = ?')
  let users = stmt.all(1)
  console.log(\`Found \${users.length} active users\`)
})()`
  }
]

const App = () => {
  const [selectedExample, setSelectedExample] = useState(1)
  const [output, setOutput] = useState('')
  const [input, setInput] = useState('')

  const handleCompile = async () => {
    const { result } = window.goCompile(input)
    const formatted = await prettier.format(result || '', {
      parser: 'babel',
      plugins: [prettierPluginBabel, prettierPluginEstree]
    })
    setOutput(formatted)
  }

  useEffect(() => {
    setInput(examples[selectedExample].code)
    setOutput('')
  }, [selectedExample])

  return (
    <div class="p-4 flex flex-col gap-2 min-h-screen sm:h-screen">
      <header class="mb-2 mx-1 flex items-center justify-between">
        <h1 class="text-2xl font-semibold">DJS Playground (Beta)</h1>
        <a href="https://github.com/xjslang/djs">Github</a>
      </header>
      <div class="grid sm:grid-cols-2 gap-2">
        <select
          id="choose-example"
          value={selectedExample}
          onInput={(e) =>
            setSelectedExample(parseInt(e.currentTarget.value, 10))
          }
          class="select w-full"
        >
          {examples.map((example, i) => (
            <option key={i} value={i} selected={selectedExample === i}>
              {example.title}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleCompile}
          class="btn btn-primary hidden sm:flex"
        >
          ↓ Compile to JavaScript ↓
        </button>
      </div>
      <div class="grow flex flex-col sm:grid sm:grid-cols-2 gap-2">
        <textarea
          name="input"
          value={input}
          onInput={(e) => setInput(e.currentTarget.value)}
          rows={16}
          class="textarea w-full"
        />
        <button
          type="button"
          onClick={handleCompile}
          class="btn btn-primary sm:hidden"
        >
          ↓ Compile to JavaScript ↓
        </button>
        <div class="grow overflow-auto px-3 py-2 whitespace-pre text-sm text-base-content bg-base-200 border border-base-content/20 rounded-sm">
          {output}
        </div>
      </div>
    </div>
  )
}

export default App
