export {}

declare global {
  interface Window {
    wasmReady: Promise<void>
    goCompile: (input: string) => { result?: string; error?: string }
  }
}
