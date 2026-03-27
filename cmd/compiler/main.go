package main

import (
	"syscall/js"

	djsbuilder "github.com/xjslang/djs/builder"
	"github.com/xjslang/xjs/compiler"
	"github.com/xjslang/xjs/lexer"
)

func Compile(input string) (string, error) {
	lb := lexer.NewBuilder()
	p := djsbuilder.New(lb).Build(input)
	program, err := p.ParseProgram()
	if err != nil {
		return "", err
	}
	c := compiler.New()
	result := c.Compile(program)
	return result.Code, nil
}

func main() {
	js.Global().Set("goCompile", js.FuncOf(func(this js.Value, args []js.Value) any {
		input := args[0].String()
		result, err := Compile(input)
		if err != nil {
			return map[string]any{"error": err.Error()}
		}
		return map[string]any{"result": result}
	}))
	// Keep the runtime alive
	select {}
}
