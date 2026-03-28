import { useState } from 'preact/hooks'
import * as prettier from 'prettier/standalone'
import * as prettierPluginBabel from 'prettier/plugins/babel'
import * as prettierPluginEstree from 'prettier/plugins/estree'

const App = () => {
  const [output, setOutput] = useState('')
  const [sourceCode, setSourceCode] =
    useState(`let sqlite = require('better-sqlite3')

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
})()`)

  const handleCompile = async () => {
    const { result } = window.goCompile(sourceCode)
    const formatted = await prettier.format(result || '', {
      parser: 'babel',
      plugins: [prettierPluginBabel, prettierPluginEstree]
    })
    setOutput(formatted)
  }

  return (
    <div class="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 h-screen">
      <div class="flex flex-col gap-2">
        <textarea
          value={sourceCode}
          onInput={(e) => setSourceCode(e.currentTarget.value)}
          class="textarea w-auto grow"
          rows={16}
        />
        <button type="button" onClick={handleCompile} class="btn btn-primary">
          Compile to JavaScript &mdash;&gt;
        </button>
      </div>
      <div class="overflow-auto px-3 py-2 whitespace-pre text-sm text-base-content bg-base-200 border border-base-content/20 rounded-sm">
        {output}
      </div>
    </div>
  )
}

export default App
