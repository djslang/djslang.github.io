const App = () => {
  const handleCompile = () => {
    const { result } = window.goCompile('hello there!')
    console.log(result)
  }

  return (
    <div class="p-8">
      <h1 class="text-2xl font-semibold">DJS Language</h1>
      <button type="button" onClick={handleCompile} class="btn">
        Compile
      </button>
    </div>
  )
}

export default App
