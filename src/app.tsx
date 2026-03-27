import { useState } from 'preact/hooks'

const App = () => {
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
    const { result, error } = window.goCompile(sourceCode)
    console.log(result, error)
  }

  return (
    <div class="p-8 inline-flex flex-col gap-2">
      <textarea
        value={sourceCode}
        onInput={(e) => setSourceCode(e.currentTarget.value)}
        class="textarea w-auto"
        rows={16}
        cols={80}
      />
      <button type="button" onClick={handleCompile} class="btn">
        Compile
      </button>
    </div>
  )
}

export default App
