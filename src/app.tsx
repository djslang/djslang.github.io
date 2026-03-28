import { useState } from 'preact/hooks'

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

  const handleCompile = () => {
    const { result } = window.goCompile(sourceCode)
    setOutput(result || '')
  }

  return (
    <div class="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div class="flex flex-col gap-2">
        <textarea
          value={sourceCode}
          onInput={(e) => setSourceCode(e.currentTarget.value)}
          class="textarea w-auto"
          rows={16}
        />
        <button type="button" onClick={handleCompile} class="btn btn-primary">
          Compile to JavaScript &mdash;&gt;
        </button>
      </div>
      <div class="overflow-auto px-3 py-2 text-sm text-base-content bg-base-200 border border-base-content/20 rounded-sm min-h-91 sm:min-h-auto">
        {output}
      </div>
    </div>
  )
}

export default App
